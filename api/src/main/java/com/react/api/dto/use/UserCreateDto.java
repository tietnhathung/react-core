package com.react.api.dto.use;

import com.react.api.validation.constraints.UserUnique;
import lombok.*;

import javax.validation.constraints.*;
import java.io.Serializable;

@Data
public class UserCreateDto implements Serializable {
    @NotEmpty
    @Size(max = 12, min = 6)
    @NotNull
    @UserUnique
    private String username;

    @NotEmpty
    @Size(max = 255, min = 4)
    @NotNull
    private String fullName;

    @NotEmpty
    @Size(max = 12, min = 6)
    @NotNull
    private String password;

    @NotNull
    private Boolean status;
}
