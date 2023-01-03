package com.capgemini.kpsbackend.repository.link;

import com.capgemini.kpsbackend.entities.link.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LinkRepository  extends JpaRepository<Link,Integer> {

    Optional<Link> findByLabel(String label);

    @Query("SELECT l FROM Link l WHERE l.fromNode= ?1")
    Optional<List<Link>> findBySourceNode(String src);

}
