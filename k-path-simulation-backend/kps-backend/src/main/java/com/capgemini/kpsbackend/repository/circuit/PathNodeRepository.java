package com.capgemini.kpsbackend.repository.circuit;

import com.capgemini.kpsbackend.entities.circuit.PathNode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PathNodeRepository extends JpaRepository<PathNode,Integer> {
}
