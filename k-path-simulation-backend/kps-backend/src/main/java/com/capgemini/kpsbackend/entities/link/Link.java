package com.capgemini.kpsbackend.entities.link;

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
public class Link {
    @Id
    @SequenceGenerator(name = "link_sequence",sequenceName = "link_sequence")
    @GeneratedValue(strategy = SEQUENCE,generator = "link_sequence")
    private Integer id;

    private String label;
    private String fromNode;
    private String toNode;
    private Character fromEdge;
    private Character toEdge;
    private Integer length;
    private Integer weight;
    private Integer noOfSpaces;

    @OneToMany(mappedBy = "link",orphanRemoval = true,cascade = CascadeType.ALL)
    private List<Space> spaces;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "network_id")
    private Network network;
}