package com.capgemini.kpsbackend.service;

import com.capgemini.kpsbackend.algorithm.ListAllPaths;
import com.capgemini.kpsbackend.algorithm.__Node;
import com.capgemini.kpsbackend.algorithm.__Path;
import com.capgemini.kpsbackend.entities.Network;
import com.capgemini.kpsbackend.entities.circuit.Circuit;
import com.capgemini.kpsbackend.entities.circuit.Path;
import com.capgemini.kpsbackend.entities.circuit.PathNode;
import com.capgemini.kpsbackend.entities.link.Link;
import com.capgemini.kpsbackend.entities.link.Space;
import com.capgemini.kpsbackend.entities.node.Node;
import com.capgemini.kpsbackend.exception.NetworkNotFoundException;
import com.capgemini.kpsbackend.repository.NetworkRepository;
import com.capgemini.kpsbackend.repository.circuit.CircuitRepository;
import com.capgemini.kpsbackend.repository.circuit.PathNodeRepository;
import com.capgemini.kpsbackend.repository.circuit.PathRepository;
import com.capgemini.kpsbackend.repository.link.LinkRepository;
import com.capgemini.kpsbackend.repository.node.NodeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AnalysePathService {

    @Autowired
    private NetworkRepository networkRepository;

    @Autowired
    private NodeRepository nodeRepository;

    @Autowired
    private LinkRepository linkRepository;

    @Autowired
    private CircuitRepository circuitRepository;

    @Autowired
    private PathRepository pathRepository;

    @Autowired
    private PathNodeRepository pathNodeRepository;

    public void nodesData(List<Node> nodes, List<Link> links, String udf,Network network) {
        List<String> UDF = Arrays.stream(udf.split("->")).collect(Collectors.toList());
        if (UDF.size() >= 1 || udf.equals(" ")) {
            int udfWeight = getWeightOfUDF(UDF, links);
            saveData(UDF.get(0), UDF.get(UDF.size()-1), List.of(new __Path(new ArrayList<>(UDF),udfWeight,0)),network,true);
        }

        nodes.forEach(node -> {
            List<Node> dstList = nodes.stream().filter(n -> n.getId() != node.getId()).collect(Collectors.toList());
            dstList.forEach(dst -> createPath(node.getNodeName(), dst.getNodeName(), network.getId()));
        });

    }


    public List<__Path> createPath(String src, String dst, Integer networkId) {
        List<__Node> graph = new ArrayList<>();
        Optional<Network> network = networkRepository.findById(networkId);
        if (network.isEmpty())
            throw new NetworkNotFoundException("Invalid network id");
        List<Node> nodes = network.get().getNodes();
        List<Link> linksList = network.get().getLinks();
        List<List<Boolean>> spaces = new ArrayList<>();
        nodes.forEach(node -> {
            List<Link> links = linksList.stream().filter(link -> link.getFromNode().equals(node.getNodeName())).collect(Collectors.toList());
            List<String> neighbours = links.stream().map(Link::getToNode).collect(Collectors.toList());
            List<Integer> weights = links.stream().map(Link::getWeight).collect(Collectors.toList());
            graph.add(new __Node(node.getNodeName(), neighbours, weights));
            links.forEach(link -> {
                List<Boolean> spaceAvailableList = link.getSpaces().stream().map(Space::getIsAvailable).collect(Collectors.toList());
                spaces.add(spaceAvailableList);
            });
        });
        List<__Path> pathList = ListAllPaths.getAllPaths(graph, src, 0, dst);

//
//        Integer minSize = spaces.stream().map(space -> space.size()).min(Integer::compare).get();
//
//        int commonSpace = getCommonSpace(minSize,spaces);
//
//        List<String> UDF = Arrays.stream(userDefinedPath.split("->")).collect(Collectors.toList());
//        int udfWeight = getWeightOfUDF(UDF,network.get().getLinks());
//        pathList.add(0,new __Path(UDF,udfWeight));
//        pathList.forEach(path -> path.setAllocatedSpace(commonSpace));

        saveData(src, dst, pathList, network.get(),false);
        return pathList;
    }

    private int getWeightOfUDF(List<String> udf, List<Link> links) {
        int weight = 0;
        for (int i = 0; i < udf.size() - 1; i++) {
            int from = i;
            int to = i + 1;
            List<Link> collect = links.stream().filter(link -> link.getFromNode().equals(udf.get(from)) && link.getToNode().equals(udf.get(to))).collect(Collectors.toList());
            weight += collect.get(0).getWeight();
        }
        return weight;
    }

    private int getCommonSpace(Integer minSize, List<List<Boolean>> spaces) {
        int index = 0;
        for (int i = index; i < minSize; i++) {
            int temp = i;
            List<Boolean> list = spaces.stream().map(s -> s.get(temp)).collect(Collectors.toList());
            final Boolean[] value = {list.get(0)};
            list.stream().forEach(v -> {
                if (v && value[0]) {
                    value[0] = true;
                } else {
                    value[0] = false;
                }
            });
            if (value[0]) {
                break;
            }
            index++;
        }
        return index;
    }

    private void saveData(String src, String dst, List<__Path> pathList, Network network,Boolean isUDP) {
        if (pathList.size()>0 || isUDP){
            Circuit savedCircuit = circuitRepository.save(Circuit.builder()
                    .sourceNode(src)
                    .destinationNode(dst)
                    .network(network)
                    .build());
            pathList.forEach(pathRes -> {
                Path path = Path.builder()
                        .circuit(savedCircuit)
                        .totalWeight(pathRes.getTotalWeight())
                        .spaceOccupied(pathRes.getAllocatedSpace())
                        .build();
                Path savedPath = pathRepository.save(path);
                pathRes.getPath().forEach(s -> {
                    PathNode pathNode = PathNode.builder()
                            .path(savedPath)
                            .nodeName(s)
                            .build();
                    pathNodeRepository.save(pathNode);
                });
            });
        }
    }

}
