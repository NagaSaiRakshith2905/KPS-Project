package com.capgemini.kpsbackend.dto.request.link;

import com.capgemini.kpsbackend.entities.Network;
import com.capgemini.kpsbackend.entities.link.Space;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LinkRequest {
    private Integer id;
    private String label;
    private String fromNode;
    private String toNode;
    private Character fromEdge;
    private Character toEdge;
    private Integer length;
    private Integer weight;
    private Integer noOfSpaces;
    private Network network;
}
