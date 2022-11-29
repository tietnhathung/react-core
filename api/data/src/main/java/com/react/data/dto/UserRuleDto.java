package com.react.data.dto;

import com.react.data.dto.use.UserDto;
import lombok.Data;

@Data
public class UserRuleDto {
    private UserDto user;
    private RuleDto rule;
}
