package com.capgemini.kpsbackend.dto.request.circuit;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CircuitRequest {
    private String sourceNode;
    private String destinationNode;
    private Integer networkId;
    private String userDefinedPath;
}
