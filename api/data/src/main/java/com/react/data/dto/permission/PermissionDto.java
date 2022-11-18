package com.react.data.dto.permission;

import lombok.Data;

import java.io.Serializable;

@Data
public class PermissionDto implements Serializable {
    private Integer id;
    private String name;
}
