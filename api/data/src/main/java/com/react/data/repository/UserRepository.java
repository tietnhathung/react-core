package com.react.data.repository;

import com.react.data.model.Permission;
import com.react.data.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {
    Optional<User> findByUsername(String username);

    @Query("select permission from User as us " +
            "inner join UserRule as userRule on userRule.user.id = us.id " +
            "inner join RulePermission as rulePermission on rulePermission.rule.id = userRule.rule.id " +
            "inner join Permission as permission on permission.id = rulePermission.permission.id " +
            "where us.id = :userId")
    List<Permission> getPermissions(@Param("userId")int userId);

    @Override
    @EntityGraph(attributePaths = "rules")
    Optional<User> findById(Integer integer);
}