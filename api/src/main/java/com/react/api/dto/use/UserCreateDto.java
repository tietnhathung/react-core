package com.react.api.dto.use;

import com.react.api.validation.constraints.UserUnique;
import lombok.Data;

import javax.validation.constraints.*;
import java.io.Serializable;

@Data
public class UserCreateDto implements Serializable {
    @NotEmpty()
    @Size(max = 12,min = 6)
    @NotNull
    @UserUnique
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
