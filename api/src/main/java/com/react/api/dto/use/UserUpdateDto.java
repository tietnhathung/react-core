package com.react.api.dto.use;

import com.react.api.validation.constraints.UpdatePassword;
import com.react.api.validation.constraints.UserUnique;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Data
@UserUnique(message = "username must be unique")
public class UserUpdateDto implements Serializable {
    private final Integer id;

    @NotEmpty()
    @Size(max = 12,min = 6)
    @NotNull
    private final String username;

    @NotEmpty()
    @Size(max = 255,min = 4)
    @NotNull
    private final String fullName;

    @UpdatePassword(max = 12,min = 6)
    private final String password;

    @NotNull
    private final Boolean status;
}
