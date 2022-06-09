package com.react.api.dto.use;

import lombok.*;

import javax.validation.constraints.*;
import java.io.Serializable;

@Data
public class UserCreateDto extends UserDto {
    @NotEmpty
    @Size(max = 12, min = 6)
    @NotNull
    private String password;
}
