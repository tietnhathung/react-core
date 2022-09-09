package com.react.common.dto.rule;

import com.react.common.dto.permission.PermissionDto;
import com.react.data.model.Rule;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@Data
public class RuleDto implements Serializable {
    private Integer id;

    @NotNull
    @NotEmpty
    @Size(min = 4, max = 50)
    private String name;

    @NotNull
    @Size(min = 1)
    private List<PermissionDto> permissions;

    public RuleDto(Rule rule){
        id = rule.getId();
        name = rule.getName();

    }
}
