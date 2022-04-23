package com.react.api.model;

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
@Table(name = "IOT_Accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @JsonIgnore
    @Column(name = "AccessTokenApp", length = 4000)
    private String accessTokenApp;

    @Column(name = "DefaultMonitorId")
    private Integer defaultMonitorId;

    @Column(name = "DeleteAt")
    private Instant deleteAt;

    @Column(name = "DevicePlcAlias")
    private String devicePlcAlias;

    @Column(name = "FullName")
    private String fullName;

    @JsonIgnore
    @Column(name = "Password")
    private String password;

    @Column(name = "Status")
    private Boolean status;

    @Column(name = "Username")
    private String username;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @Column(name = "CreatedBy")
    private Integer createdBy;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "IOT_UserLine", joinColumns = {@JoinColumn(name = "UserId")}, inverseJoinColumns = {@JoinColumn(name = "LineId")})
    private List<Line> lines;

    @Override
    @Transient
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Account account = (Account) o;
        return id != null && Objects.equals(id, account.id);
    }

    @Override
    @Transient
    public int hashCode() {
        return getClass().hashCode();
    }


}