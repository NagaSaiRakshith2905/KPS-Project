package com.capgemini.kpsbackend.dto.request.circuit;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PathNodeRequest {
    private String nodeName;
}
