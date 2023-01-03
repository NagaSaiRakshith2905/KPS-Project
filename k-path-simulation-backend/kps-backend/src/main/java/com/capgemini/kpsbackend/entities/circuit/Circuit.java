package com.capgemini.kpsbackend.entities.circuit;

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
public class Circuit {
    @Id
    @SequenceGenerator(name = "circuit_sequence", sequenceName = "circuit_sequence")
    @GeneratedValue(strategy = SEQUENCE, generator = "circuit_sequence")
    private Integer id;

    private String sourceNode;
    private String destinationNode;

    @OneToMany(mappedBy = "circuit", cascade = CascadeType.ALL)
    private List<Path> paths;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "network_id")
    private Network network;
}