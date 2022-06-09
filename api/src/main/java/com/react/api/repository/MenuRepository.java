package com.react.api.repository;

import com.react.api.model.Menu;
import org.springframework.data.jpa.repository.*;

import java.util.HashSet;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Integer>, JpaSpecificationExecutor<Menu> {

    @Override
    @EntityGraph(attributePaths = "permission")
    Optional<Menu> findById(Integer integer);

    @Query("select menu from Menu as menu " +
            "left join RulePermission as rp on rp.permission.id = menu.permission.id " +
            "left join UserRule ur on ur.rule.id = rp.rule.id " +
            "where (ur.user.id = :userId or (rp.id is null or ur.id is null ))")
    HashSet<Menu> findAllByUserId(Integer userId);
}