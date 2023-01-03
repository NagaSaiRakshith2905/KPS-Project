package com.capgemini.kpsbackend.dto.request;

import com.capgemini.kpsbackend.dto.request.circuit.CircuitRequest;
import com.capgemini.kpsbackend.dto.request.link.LinkRequest;
import com.capgemini.kpsbackend.dto.request.node.NodeRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NetworkRequest {
    private String networkName;
    private String username;
    private List<NodeRequest> nodes;
    private List<LinkRequest> links;
}
