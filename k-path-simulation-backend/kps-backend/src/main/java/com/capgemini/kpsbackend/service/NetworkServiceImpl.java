package com.capgemini.kpsbackend.service;

import com.capgemini.kpsbackend.dto.request.NetworkRequest;
import com.capgemini.kpsbackend.dto.request.NetworkUpdateRequest;
import com.capgemini.kpsbackend.dto.request.link.LinkRequest;
import com.capgemini.kpsbackend.dto.request.node.NodeRequest;
import com.capgemini.kpsbackend.entities.Network;
import com.capgemini.kpsbackend.entities.circuit.Circuit;
import com.capgemini.kpsbackend.entities.link.Link;
import com.capgemini.kpsbackend.entities.node.Node;
import com.capgemini.kpsbackend.entities.node.NodeType;
import com.capgemini.kpsbackend.exception.NetworkNotFoundException;
import com.capgemini.kpsbackend.repository.NetworkRepository;
import com.capgemini.kpsbackend.repository.circuit.CircuitRepository;
import com.capgemini.kpsbackend.repository.node.NodeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NetworkServiceImpl implements NetworkService {

    @Autowired
    private NetworkRepository networkRepository;
    @Autowired
    private CircuitRepository circuitRepository;

    @Autowired
    private NodeService nodeService;

    @Autowired
    private LinkService linkService;

    @Autowired
    private AnalysePathService analysePathService;

    @Override
    public Network add(NetworkRequest networkRequest) {
        Network network = Network.builder()
                .networkName(networkRequest.getNetworkName())
                .username(networkRequest.getUsername())
                .build();
        Network savedNetwork = networkRepository.save(network);

        networkRequest.getNodes().forEach(nodeRequest -> {
            nodeRequest.setNetwork(savedNetwork);
            nodeService.add(nodeRequest);
        });

        networkRequest.getLinks().forEach(linkRequest -> {
            linkRequest.setNetwork(savedNetwork);
            linkService.add(linkRequest);
        });
        return savedNetwork;
    }



    @Override
    public List<Network> getAll() {
        return networkRepository.findAll();
    }

    @Override
    public Network getById(int id) {
        Optional<Network> network = networkRepository.findById(id);
        if (network.isEmpty()) {
            throw new NetworkNotFoundException("Network doesn't exists");
        }
        return network.get();
    }

    private String mapFromNodeType(NodeType nodeType) {
        switch (nodeType) {
            case ola:
                return "ola";
            case pass_through:
                return "pass_through";
            default:
                return "add_drop";
        }
    }

    @Override
    @Transactional
    public Network update(NetworkUpdateRequest object) {
        Optional<Network> network = networkRepository.findById(object.getId());
        if (network.isEmpty()) {
            throw new NetworkNotFoundException("Invalid Id");
        }
        //updating nodes
        List<String> updatedNodesName = object.getNodes().stream().filter(node -> node.getId() >= 0).map(Node::getNodeName).collect(Collectors.toList());
        List<Node> removedNodes = network.get().getNodes().stream().filter(node -> !updatedNodesName.contains(node.getNodeName())).collect(Collectors.toList());
        network.get().getNodes().removeAll(removedNodes);
        List<Node> newNodes = object.getNodes().stream().filter(node -> node.getId().toString().equals("-1")).collect(Collectors.toList());
        newNodes.forEach(node -> {
            nodeService.add(NodeRequest.builder()
                    .nodeName(node.getNodeName())
                    .edges(node.getEdges())
                    .nodeType(mapFromNodeType(node.getNodeType()))
                    .ipAddress(node.getIpAddress())
                    .password(node.getPassword())
                    .x(node.getX())
                    .y(node.getY())
                    .network(network.get())
                    .build());
        });
        object.getNodes().stream().filter(node -> node.getId() >= 0).forEach(node -> nodeService.update(node));

        //updating links
        List<String> updatedLinksId = object.getLinks().stream().filter(link -> link.getId() >= 0).map(Link::getLabel).collect(Collectors.toList());
        List<Link> removedLinks = network.get().getLinks().stream().filter(link -> !updatedLinksId.contains(link.getLabel())).collect(Collectors.toList());
        List<Link> newLinks = object.getLinks().stream().filter(link -> link.getId().toString().equals("-1")).collect(Collectors.toList());
        newLinks.forEach(link -> linkService.add(LinkRequest.builder()
                .label(link.getLabel())
                .fromNode(link.getFromNode())
                .toNode(link.getToNode())
                .fromEdge(link.getFromEdge())
                .toEdge(link.getToEdge())
                .length(link.getLength())
                .noOfSpaces(link.getNoOfSpaces())
                .network(network.get())
                .build()));
        network.get().getLinks().removeAll(removedLinks);

        List<Circuit> circuits = network.get().getCircuits();
        network.get().getCircuits().removeAll(circuits);

        analysePath(object.getId(),object.getUdp());
        return network.get();
    }

    @Override
    public void deleteById(int id) {
        Optional<Network> network = networkRepository.findById(id);
        if (network.isEmpty()) {
            throw new NetworkNotFoundException("Network doesn't exists");
        }
        networkRepository.deleteById(id);
    }

    @Override
    public List<Network> getAllNetworkForUser(String username) {
        Optional<List<Network>> networks = networkRepository.findByUsername(username);
        if (networks.isEmpty()) {
            throw new NetworkNotFoundException("Networks doesn't exists for this user");
        }
        return networks.get();
    }

    @Override
    public void analysePath(Integer id, String udp) {
        Optional<Network> result = networkRepository.findById(id);
        Optional<List<Node>> nodes = Optional.of(result.get().getNodes());
        Optional<List<Link>> links = Optional.of(result.get().getLinks());
        if (nodes.isPresent() && links.isPresent()) analysePathService.nodesData(nodes.get(), links.get(), udp, result.get());
    }


}
