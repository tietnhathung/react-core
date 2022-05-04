package com.react.api.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @JsonIgnore
    @Column(name = "AccessTokenApp", length = 4000)
    private String accessTokenApp;

    @Column(name = "FullName")
    private String fullName;

    @Column(name = "Password")
    private String password;

    @Column(name = "Status")
    private Boolean status;

    @Column(name = "Username",unique = true)
    private String username;

    @Column(name = "CreatedAt")
    @JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss")
    private LocalDateTime createdAt;

    @Column(name = "CreatedBy")
    private Integer createdBy;

    @Override
    @Transient
    public int hashCode() {
        return getClass().hashCode();
    }

}