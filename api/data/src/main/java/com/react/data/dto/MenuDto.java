package com.react.data.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

public class MenuDto implements Serializable {
    private Integer id;

    @NotNull
    @NotEmpty
    @Size(min = 4, max = 12)
    private String title;

    @NotNull
    @NotEmpty
    @Size(min = 4, max = 255)
    private String url;

    @NotNull
    private String target;

    @NotNull
    @NotEmpty
    @Size(min = 3, max = 50)
    private String icon;

    private Integer parentId;

    private PermissionDto permission;
    private List<MenuDto> children;

    public MenuDto() {
    }

    public MenuDto(Integer id, String title, String url, String target, String icon, Integer parentId, PermissionDto permission, List<MenuDto> children) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.target = target;
        this.icon = icon;
        this.parentId = parentId;
        this.permission = permission;
        this.children = children;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public PermissionDto getPermission() {
        return permission;
    }

    public void setPermission(PermissionDto permission) {
        this.permission = permission;
    }

    public List<MenuDto> getChildren() {
        return children;
    }

    public void setChildren(List<MenuDto> children) {
        this.children = children;
    }
}
