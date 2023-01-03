package com.capgemini.kpsbackend.algorithm;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class __Node {
    private String nodeName;
    private List<String> neighbours;
    private List<Integer> neighbourWeights;
}
