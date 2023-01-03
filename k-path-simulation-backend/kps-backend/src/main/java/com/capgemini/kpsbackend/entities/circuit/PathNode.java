package com.capgemini.kpsbackend.entities.circuit;

import com.capgemini.kpsbackend.entities.circuit.Path;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PathNode {
    @Id
    @SequenceGenerator(name = "path_node_sequence",sequenceName = "path_node_sequence")
    @GeneratedValue(strategy = SEQUENCE,generator = "path_node_sequence")
    private Integer id;

    private String nodeName;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "path_id")
    private Path path;
}
