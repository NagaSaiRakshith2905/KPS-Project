package com.capgemini.kpsbackend.dto.response;

import com.capgemini.kpsbackend.entities.circuit.Circuit;
import com.capgemini.kpsbackend.entities.link.Link;
import com.capgemini.kpsbackend.entities.node.Node;

import java.util.List;


public class NetworkResponse {
    private Integer id;
    private String networkName;
    private String username;
    private List<Node> nodes;
    private List<Link> links;
    private List<Circuit> circuits;

}
