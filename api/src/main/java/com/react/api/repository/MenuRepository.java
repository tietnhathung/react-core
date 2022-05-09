package com.react.api.repository;

import com.react.api.model.Menu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import javax.persistence.QueryHint;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Integer>, JpaSpecificationExecutor<Menu> {

    @Query("select menu from Menu as menu " +
            "left join RulePermission as rp on rp.permission.id = menu.permission.id " +
            "left join UserRule ur on ur.rule.id = rp.rule.id " +
            "where (ur.user.id = :userId or (rp.id is null or ur.id is null ))")
    HashSet<Menu> findAllByUserId(Integer userId);
}