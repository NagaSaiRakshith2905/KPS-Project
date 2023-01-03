package com.capgemini.kpsbackend.service;

import com.capgemini.kpsbackend.dto.request.link.LinkRequest;
import com.capgemini.kpsbackend.entities.link.Link;
import com.capgemini.kpsbackend.entities.link.Space;
import com.capgemini.kpsbackend.exception.NetworkNotFoundException;
import com.capgemini.kpsbackend.repository.link.LinkRepository;
import com.capgemini.kpsbackend.repository.link.SpaceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class LinkService {

    @Autowired
    private LinkRepository linkRepository;

    @Autowired
    private SpaceRepository spaceRepository;

    public Link add(LinkRequest linkRequest) {
        Link link = Link.builder()
                .fromNode(linkRequest.getFromNode())
                .toNode(linkRequest.getToNode())
                .fromEdge(linkRequest.getFromEdge())
                .toEdge(linkRequest.getToEdge())
                .label(linkRequest.getLabel())
                .length(linkRequest.getLength())
                .noOfSpaces(linkRequest.getNoOfSpaces())
                .network(linkRequest.getNetwork())
                .weight((int) (linkRequest.getLength() * 0.25))
                .build();
        Link savedLink = linkRepository.save(link);

        createSpaces(linkRequest.getNoOfSpaces(), savedLink);

        return savedLink;
    }

    private void createSpaces(Integer noOfSpaces, Link savedLink) {
        for (int i = 0; i < noOfSpaces; i++) {
            spaceRepository.save(Space.builder()
                    .isAvailable(true)
                    .spaceNumber(i)
                    .link(savedLink)
                    .build());
        }
    }

    public List<Link> getAll() {
        return linkRepository.findAll();
    }

    public Object getById(int id) {
        Optional<Link> link = linkRepository.findById(id);
        if(link.isEmpty()){
            throw new NetworkNotFoundException("Link doesn't exists");
        }
        return link;
    }

    @Transactional
    public Object update(Link object) {
        Optional<Link> link = linkRepository.findById(object.getId());
        if(link.isEmpty()){
            throw new NetworkNotFoundException("Link doesn't exists");
        }
        String label = link.get().getLabel();
        String fromNode = link.get().getFromNode();
        String toNode = link.get().getToNode();
        Character fromEdge = link.get().getFromEdge();
        Character toEdge = link.get().getToEdge();
        int length = link.get().getLength();
        int weight = link.get().getWeight();
        int noOfSpaces = link.get().getNoOfSpaces();
        List <Space> spacesList = link.get().getSpaces();

        String objectLabel = object.getLabel();
        String objectFromNode = object.getFromNode();
        String objectToNode = object.getToNode();
        Character objectFromEdge = object.getFromEdge();
        Character objectToEdge = object.getToEdge();
        int objectLength = object.getLength();
        int objectWeight = object.getWeight();
        int objectNoOfSpaces = object.getNoOfSpaces();
        List <Space> objectSpacesList = object.getSpaces();

        if(!label.equals(objectLabel)){
            link.get().setLabel(objectLabel);
        }
        else if (!fromNode.equals(objectFromNode)) {
            link.get().setFromNode(objectFromNode);
        }
        else if(!toNode.equals(objectToNode)){
            link.get().setToNode(objectToNode);
        }
        else if (!fromEdge.equals(objectFromEdge)) {
            link.get().setFromEdge(objectFromEdge);
        }
        else if(!toEdge.equals(objectToEdge)){
            link.get().setToEdge(objectToEdge);
        }
        else if(length!=objectLength){
            link.get().setLength(objectLength);
        }
        else if(weight!=objectWeight){
            link.get().setWeight(objectWeight);
        }
        else if(noOfSpaces!=objectNoOfSpaces){
            link.get().setNoOfSpaces(objectNoOfSpaces);
        }
        else if(!spacesList.equals(objectSpacesList)){
            //Todo
        }
        return link;
    }

    public void deleteById(int id) {
        Optional<Link> link = linkRepository.findById(id);
        if(link.isEmpty()){
            throw new NetworkNotFoundException("Link doesn't exists");
        }
        log.info(link.get().getLabel());
        linkRepository.deleteById(id);
    }
}
