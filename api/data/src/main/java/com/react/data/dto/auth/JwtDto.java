package com.react.data.dto.auth;

import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.Serializable;

@Data
public class JwtDto implements Serializable {
    private String accessToken;
    private String refreshToken;
    private UserDetails user;

    private void writeObject(ObjectOutputStream oos) throws IOException {
        oos.defaultWriteObject();
        oos.writeObject(user.getUsername());
    }
}
