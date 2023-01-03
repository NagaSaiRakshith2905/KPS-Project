package com.capgemini.kpsbackend.algorithm;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class __Path implements Comparable<__Path> {
    private List<String> path;
    private Integer totalWeight;
    private Integer allocatedSpace;

    public __Path() {
        path = new ArrayList<>();
        totalWeight = 0;
    }

    public __Path(List<String> path, Integer totalWeight) {
        this.path = path;
        this.totalWeight = totalWeight;
    }

    @Override
    public String toString() {
        return "path{" +
                "path=" + path +
                ", totalWeight=" + totalWeight +
                '}';
    }

    @Override
    public int compareTo(__Path path) {

        return getTotalWeight().compareTo(path.getTotalWeight());
    }
}
