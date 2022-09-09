package com.react.data.repository;

import com.react.data.model.Rule;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
public interface RuleRepository extends JpaRepository<Rule, Integer> {

    @EntityGraph(attributePaths = "permissions")
    @Query("select r from Rule r where r.id = :id")
    Optional<Rule> findByIdWithPermissions(@Param("id")Integer id);
}