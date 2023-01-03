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
public class PathRequest {
    private Integer totalWeight;
    private List<PathNodeRequest> nodes;
}
