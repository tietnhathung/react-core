package com.react.data.dto;

public class RulePermissionDto {
    private PermissionDto permission;
    private RuleDto rule;

    public RulePermissionDto() {
    }

    public RulePermissionDto(PermissionDto permission, RuleDto rule) {
        this.permission = permission;
        this.rule = rule;
    }

    public PermissionDto getPermission() {
        return permission;
    }

    public void setPermission(PermissionDto permission) {
        this.permission = permission;
    }

    public RuleDto getRule() {
        return rule;
    }

    public void setRule(RuleDto rule) {
        this.rule = rule;
    }
}
