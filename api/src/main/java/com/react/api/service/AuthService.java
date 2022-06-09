package com.react.api.service;

import com.react.api.dto.auth.GoogleLoginDto;
import com.react.api.dto.auth.JwtDto;
import com.react.api.dto.auth.LoginDto;
import com.react.api.dto.auth.RefreshTokenDto;

public interface AuthService {
    JwtDto login(LoginDto loginDto);

    JwtDto googleLogin(GoogleLoginDto googleLoginDto) throws Exception;

    JwtDto refresh(RefreshTokenDto refreshTokenDto) throws Exception;
}
