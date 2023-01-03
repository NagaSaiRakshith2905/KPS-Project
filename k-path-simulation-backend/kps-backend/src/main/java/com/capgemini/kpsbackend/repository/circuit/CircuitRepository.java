package com.capgemini.kpsbackend.repository.circuit;

import com.capgemini.kpsbackend.entities.circuit.Circuit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CircuitRepository extends JpaRepository<Circuit,Integer> {
}
