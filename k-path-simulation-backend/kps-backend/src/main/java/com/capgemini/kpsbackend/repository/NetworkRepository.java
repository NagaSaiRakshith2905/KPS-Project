package com.capgemini.kpsbackend.repository;

import com.capgemini.kpsbackend.entities.Network;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NetworkRepository extends JpaRepository<Network,Integer> {
    Optional<List<Network>> findByUsername(String username);
}
