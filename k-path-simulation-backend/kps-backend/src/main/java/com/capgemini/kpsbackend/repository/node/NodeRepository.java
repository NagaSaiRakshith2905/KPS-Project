package com.capgemini.kpsbackend.repository.node;

import com.capgemini.kpsbackend.entities.node.Node;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NodeRepository extends JpaRepository<Node,Integer> {

}
