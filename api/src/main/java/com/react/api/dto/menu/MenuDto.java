package com.react.api.dto.menu;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.react.api.dto.permission.PermissionDto;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Data
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
}
