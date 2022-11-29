package com.react.data.dto;

import java.io.Serializable;
import java.util.List;


public class PermissionDto implements Serializable {
    private Integer id;
    private String name;

    List<RuleDto> rules;

    public PermissionDto() {
    }

    public PermissionDto(Integer id, String name, List<RuleDto> rules) {
        this.id = id;
        this.name = name;
        this.rules = rules;
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

    public List<RuleDto> getRules() {
        return rules;
    }

    public void setRules(List<RuleDto> rules) {
        this.rules = rules;
    }
}
