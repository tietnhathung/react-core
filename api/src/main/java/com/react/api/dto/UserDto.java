package com.react.api.dto;

import lombok.Data;

import javax.validation.constraints.*;
import java.io.Serializable;

@Data
public class UserDto implements Serializable {
    @NotEmpty()
    @Size(max = 12,min = 6)
    @NotNull
    private final String username;

    @NotEmpty()
    @Size(max = 255,min = 4)
    @NotNull
    private final String fullName;

    @NotEmpty()
    @Size(max = 12,min = 6)
    @NotNull
    private final String password;

    @NotNull
    private final Boolean status;
}
