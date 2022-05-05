package com.react.api.model;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "user", indexes = {
        @Index(name = "user_username_uindex", columnList = "username", unique = true)
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "username", nullable = false, length = 20)
    private String username;

    @Column(name = "fullName")
    private String fullName;

    @Column(name = "password", nullable = false)
    private String password;

    @Lob
    @Column(name = "accessTokenApp")
    private String accessTokenApp;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "createdAt")
    private Instant createdAt;

    @Column(name = "createdBy")
    private Integer createdBy;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAccessTokenApp() {
        return accessTokenApp;
    }

    public void setAccessTokenApp(String accessTokenApp) {
        this.accessTokenApp = accessTokenApp;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

}