package com.capgemini.kpsbackend.entities.link;

import com.capgemini.kpsbackend.entities.link.Link;
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
public class Space {
    @Id
    @SequenceGenerator(name = "space_sequence",sequenceName = "space_sequence")
    @GeneratedValue(strategy = SEQUENCE,generator = "space_sequence")
    private Integer id;

    private Integer spaceNumber;
    private Boolean isAvailable;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "link_id")
    private Link link;
}
