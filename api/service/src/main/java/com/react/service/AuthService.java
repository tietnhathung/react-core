package com.react.service;

import com.react.data.dto.auth.GoogleLoginDto;
import com.react.data.dto.auth.JwtDto;
import com.react.data.dto.auth.LoginDto;
import com.react.data.dto.auth.RefreshTokenDto;

public interface AuthService {
    JwtDto login(LoginDto loginDto);

    JwtDto googleLogin(GoogleLoginDto googleLoginDto) throws Exception;

    JwtDto refresh(RefreshTokenDto refreshTokenDto) throws Exception;
}
