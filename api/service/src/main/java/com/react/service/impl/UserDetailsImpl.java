package com.react.service.impl;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.react.data.model.Permission;
import com.react.data.model.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {
    private final Integer id;
    private final String fullName;
    private final String username;
    private final String password;
    private final boolean status;
    private final Collection<SimpleGrantedAuthority> authorities;

    public UserDetailsImpl(User user, Collection<Permission> permissions) {
        id = user.getId();
        fullName = user.getFullName();
        username = user.getUsername();
        password = user.getPassword();
        status = user.getStatus();
        authorities = permissions.stream().map(p -> new SimpleGrantedAuthority(p.getName())).collect(Collectors.toList());
    }

    @Override
    public Collection<SimpleGrantedAuthority> getAuthorities() {
        return Collections.unmodifiableCollection(authorities);
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