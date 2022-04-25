package com.react.api.dto.auth;

import com.react.api.model.User;
import com.react.api.service.UserDetailsImpl;
import lombok.Data;

@Data
public class JwtDto {
    private String access_token;
    private String refresh_token;
    private UserDetailsImpl user;
}
