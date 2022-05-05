package com.react.api.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.react.api.model.Permission;
import com.react.api.model.Rule;
import com.react.api.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {
    private final Integer id;
    private final String fullName;
    private final String username;
    private final String password;
    private final boolean status;
    private final List<GrantedAuthority> authorities;


    public UserDetailsImpl(User user, List<Permission> permissions) {
        this.id = user.getId();
        this.fullName = user.getFullName();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.status = user.getStatus();
        authorities = permissions.stream().map(p -> new SimpleGrantedAuthority(p.getName()) ).collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status;
    }

    public String getFullName() {
        return fullName;
    }

    public Integer getId() {
        return id;
    }
}