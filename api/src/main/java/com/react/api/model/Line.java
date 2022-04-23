package com.react.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "IOT_Line")
public class Line {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Note")
    private String note;

    @Column(name = "PlcAlias")
    private String plcAlias;

    @Column(name = "Status", nullable = false)
    private Integer status;

    @Column(name = "TypeDevice", nullable = false)
    private Integer typeDevice;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @Column(name = "CreatedBy")
    private Integer createdBy;

    @Column(name = "CycleTime")
    private Double cycleTime;

    @JsonIgnore
    @ManyToMany(mappedBy="lines")
    private List<Account> users;


    @Override
    @Transient
    @JsonIgnore
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Line line = (Line) o;
        return id != null && Objects.equals(id, line.id);
    }

    @Override
    @Transient
    @JsonIgnore
    public int hashCode() {
        return getClass().hashCode();
    }
}