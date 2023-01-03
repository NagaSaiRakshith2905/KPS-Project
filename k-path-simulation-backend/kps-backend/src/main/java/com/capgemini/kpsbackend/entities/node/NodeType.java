package com.capgemini.kpsbackend.entities.node;

import java.util.HashMap;
import java.util.Map;

public enum NodeType {
    add_drop(16),ola(2),pass_through(2);

    private final int noOfEdges;

    NodeType(int noOfEdges) {
        this.noOfEdges=noOfEdges;
    }

    public int getNoOfEdges(){
       return noOfEdges;
    }
}
