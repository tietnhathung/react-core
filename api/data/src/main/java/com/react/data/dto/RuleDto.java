package com.react.data.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;


public class RuleDto implements Serializable {
    private Integer id;

    @NotNull
    @NotEmpty
    @Size(min = 4, max = 50)
    private String name;

    @NotNull
    @Size(min = 1)
    private List<PermissionDto> permissions;

    public RuleDto() {
    }

    public RuleDto(Integer id, String name, List<PermissionDto> permissions) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<PermissionDto> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<PermissionDto> permissions) {
        this.permissions = permissions;
    }
}
