package com.capgemini.kpsbackend.entities;


import com.capgemini.kpsbackend.entities.circuit.Circuit;
import com.capgemini.kpsbackend.entities.link.Link;
import com.capgemini.kpsbackend.entities.node.Node;
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
public class Network {
    @Id
    @SequenceGenerator(name = "network_sequence",sequenceName = "network_sequence")
    @GeneratedValue(strategy = SEQUENCE,generator = "network_sequence")
    private Integer id;

    private String networkName;
    private String username;

    @OneToMany(mappedBy = "network",orphanRemoval = true,cascade = CascadeType.ALL)
    private List<Node> nodes;

    @OneToMany(mappedBy = "network",orphanRemoval = true,cascade = CascadeType.ALL)
    private List<Link> links;

    @OneToMany(mappedBy = "network",orphanRemoval = true,cascade = CascadeType.ALL)
    private List<Circuit> circuits;
}