package com.react.data.dto.use;

import com.react.data.dto.rule.RuleDto;
import com.react.data.model.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


public class UserDto implements Serializable {
    private Integer id;
    @NotBlank
    @Size(max = 20, min = 6)
    @NotNull
    private String username;

    @NotEmpty
    @Size(max = 255, min = 4)
    @NotNull
    private String fullName;

    @NotNull
    private Boolean status;

    private LocalDateTime createdAt;

    @NotNull
    private List<RuleDto> rules = new ArrayList<>();

    public UserDto(){}
    public UserDto(Integer id, String username, String fullName, Boolean status, LocalDateTime createdAt, List<RuleDto> rules) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.status = status;
        this.createdAt = createdAt;
        this.rules = rules;
    }

    public UserDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.fullName = user.getFullName();
        this.status = user.getStatus();
        this.createdAt = user.getCreatedAt();
        this.rules = user.getRules().stream().map(RuleDto::new).collect(Collectors.toList());
    }

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

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<RuleDto> getRules() {
        return rules;
    }

    public void setRules(List<RuleDto> rules) {
        this.rules = rules;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserDto)) return false;

        UserDto userDto = (UserDto) o;

        return getId().equals(userDto.getId());
    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }
}
