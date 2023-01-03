package com.capgemini.kpsbackend.dto.request.node;

import com.capgemini.kpsbackend.entities.Network;
import com.capgemini.kpsbackend.entities.node.Edge;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NodeRequest {
    private Integer id;
    private String nodeName;
    private String ipAddress;
    private String password;
    private Integer x;
    private Integer y;
    private String nodeType;
    private List<Edge> edges;
    private Network network;
}
