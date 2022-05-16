package com.react.api.repository;

import com.react.api.model.Rule;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RuleRepository extends JpaRepository<Rule, Integer> {

    @EntityGraph(attributePaths = "permissions")
    @Query("select r from Rule r where r.id = :id")
    Optional<Rule> findByIdWithPermissions(Integer id);
}