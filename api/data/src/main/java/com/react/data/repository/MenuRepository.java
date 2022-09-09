package com.react.data.repository;

import com.react.data.model.Menu;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.HashSet;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Integer>, JpaSpecificationExecutor<Menu> {

    @Override
    @EntityGraph(attributePaths = "permission")
    Optional<Menu> findById(@Param("id")Integer id);

    @Query("select menu from Menu as menu " +
            "left join RulePermission as rp on rp.permission.id = menu.permission.id " +
            "left join UserRule ur on ur.rule.id = rp.rule.id " +
            "where (ur.user.id = :userId or (rp.id is null or ur.id is null ))")
    HashSet<Menu> findAllByUserId(@Param("userId")Integer userId);
}