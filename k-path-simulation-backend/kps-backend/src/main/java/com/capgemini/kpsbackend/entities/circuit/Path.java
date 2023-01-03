package com.capgemini.kpsbackend.entities.circuit;

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
public class Path {
    @Id
    @SequenceGenerator(name = "path_sequence",sequenceName = "path_sequence")
    @GeneratedValue(strategy = SEQUENCE,generator = "path_sequence")
    private Integer id;

    private Integer totalWeight;
    private Integer spaceOccupied;

    @OneToMany(mappedBy = "path",cascade = CascadeType.ALL)
    private List<PathNode> nodes;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "circuit_id")
    private Circuit circuit;
}
