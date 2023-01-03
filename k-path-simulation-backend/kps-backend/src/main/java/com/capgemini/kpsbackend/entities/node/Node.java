package com.capgemini.kpsbackend.entities.node;

import com.capgemini.kpsbackend.entities.Network;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Node {
    @Id
    @SequenceGenerator(name = "node_sequence",sequenceName = "node_sequence")
    @GeneratedValue(strategy = SEQUENCE,generator = "node_sequence")
    private Integer id;

    private String nodeName;
    private String ipAddress;
    private String password;
    private Integer x;
    private Integer y;
    private NodeType nodeType;

    @OneToMany(mappedBy = "node",orphanRemoval = true , cascade = CascadeType.ALL)
    private List<Edge> edges;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "network_id")
    private Network network;
}
