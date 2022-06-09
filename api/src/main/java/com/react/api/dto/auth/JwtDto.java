package com.react.api.dto.auth;

import com.react.api.service.impl.UserDetailsImpl;
import lombok.Data;

import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.Serializable;

@Data
public class JwtDto implements Serializable {
    private String accessToken;
    private String refreshToken;
    private UserDetailsImpl user;

    private void writeObject(ObjectOutputStream oos) throws IOException {
        oos.defaultWriteObject();
        oos.writeObject(user.getUsername());
    }
}
