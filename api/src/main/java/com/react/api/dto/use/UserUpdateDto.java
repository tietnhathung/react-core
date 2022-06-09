package com.react.api.dto.use;


import com.react.api.validation.constraints.UpdatePassword;
import lombok.Data;

import java.io.Serializable;


@Data
public class UserUpdateDto extends UserDto implements Serializable {
    @UpdatePassword(max = 12, min = 6)
    private String password;
}
