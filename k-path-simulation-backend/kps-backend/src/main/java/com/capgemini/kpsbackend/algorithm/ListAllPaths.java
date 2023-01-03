package com.capgemini.kpsbackend.algorithm;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;

import java.util.*;
import java.util.stream.Collectors;


@Slf4j
public class ListAllPaths {
//    public static void main(String[] args) {
//        ListAllPaths listAllPaths = new ListAllPaths();
//
//        List<__Node> nodeList = new ArrayList<>();
//        nodeList.add(new __Node("Node1", List.of("Node2", "Node3", "Node6"), List.of(2, 3, 6)));
//        nodeList.add(new __Node("Node2", List.of("Node1", "Node4", "Node5"), List.of(1, 4, 5)));
//        nodeList.add(new __Node("Node3", List.of("Node1", "Node4", "Node5"), List.of(1, 4, 6)));
//        nodeList.add(new __Node("Node4", List.of("Node2", "Node3", "Node6"), List.of(2, 3, 6)));
//        nodeList.add(new __Node("Node5", List.of("Node2", "Node3", "Node6"), List.of(2, 3, 6)));
//        nodeList.add(new __Node("Node6", List.of("Node1", "Node4", "Node5"), List.of(1, 4, 5)));
//
//        List<__Path> pathList = listAllPaths.getAllPaths(nodeList, "Node1", 0, "Node6");
//        pathList.forEach(System.out::println);
//    }

    public static List<__Path> getAllPaths(List<__Node> nodeList, String src, Integer weight, String dst) {
        List<__Path> result = new ArrayList();
        __Path path = new __Path();
        List<String> visited = new Stack<>();
        calculatePaths(nodeList, result, path, src, weight, dst, visited);
        Collections.sort(result);
        return result;
    }

    public static void calculatePaths(List<__Node> nodeList, List<__Path> result, __Path path, String src, Integer weight, String dst, List<String> visited) {
        path.getPath().add(src);
        path.setTotalWeight(path.getTotalWeight() + weight);
        if (src.equals(dst)) {
            result.add(new __Path(new ArrayList<>(path.getPath()), path.getTotalWeight()));
        } else {
            if (!visited.contains(src)) {

                __Node node = nodeList.stream().filter(n -> n.getNodeName().equals(src)).collect(Collectors.toList()).get(0);
                visited.add(src);
                log.info(node.toString());
                if (node.getNeighbours().size() > 0) {
                    for (int i = 0; i < node.getNeighbours().size(); i++) {
                        String n = node.getNeighbours().get(i);
                        Integer w = node.getNeighbourWeights().get(i);
                        calculatePaths(nodeList, result, path, n, w, dst, visited);
                    }
                }
                visited.remove(visited.size() - 1);
            }
        }
        path.getPath().remove(path.getPath().size() - 1);
        path.setTotalWeight(path.getTotalWeight() - weight);
    }

    private List<List<String>> getPaths(List<Map<String, List<String>>> graph, String src, String dst) {
        List<List<String>> result = new ArrayList<>();
        List<String> path = new ArrayList<>();
        List<String> visited = new Stack<>();
        calculatePath(graph, result, path, src, dst, visited);
        return result;
    }


    private void calculatePath(List<Map<String, List<String>>> graph, List<List<String>> result, List<String> path, String src, String dst, List<String> visited) {
        path.add(src);
        if (src.equals(dst)) {
            result.add(new ArrayList<>(path));
        } else {
            if (!visited.contains(src)) {
                List<List<String>> neighbours = graph.stream()
                        .filter(stringListMap ->
                                stringListMap.keySet().toString().contains(src))
                        .map(stringListMap -> stringListMap.get(src))
                        .collect(Collectors.toList());
                visited.add(src);
                for (String v : neighbours.get(0)) {
                    calculatePath(graph, result, path, v, dst, visited);
                }
                visited.remove(visited.size() - 1);
            }
        }
        path.remove(path.size() - 1);
    }
}



