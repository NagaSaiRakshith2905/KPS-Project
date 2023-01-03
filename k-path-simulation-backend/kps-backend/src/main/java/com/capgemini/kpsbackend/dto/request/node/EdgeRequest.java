package com.capgemini.kpsbackend.dto.request.node;

import com.capgemini.kpsbackend.entities.node.Node;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EdgeRequest {
    private Character edgeName;
    private Boolean isAvailable;

    private Node node;
}
