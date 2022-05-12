package com.react.api.repository;

import com.react.api.model.Permission;
import com.react.api.model.User;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {
    @Cacheable(value = "UserRepository.findByUsername",key = "#username")
    Optional<User> findByUsername(String username);


    @Cacheable(value = "UserRepository.getPermissions",key = "#userId")
    @Query(value = "select permission from User as us " +
            "inner join UserRule as userRule on userRule.user.id = us.id " +
            "inner join RulePermission as rulePermission on rulePermission.rule.id = userRule.rule.id " +
            "inner join Permission as permission on permission.id = rulePermission.permission.id " +
            "where us.id = :userId")
    List<Permission> getPermissions(int userId);
}