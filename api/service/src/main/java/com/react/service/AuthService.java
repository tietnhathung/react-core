package com.react.service;

import com.react.common.dto.auth.GoogleLoginDto;
import com.react.common.dto.auth.JwtDto;
import com.react.common.dto.auth.LoginDto;
import com.react.common.dto.auth.RefreshTokenDto;

public interface AuthService {
    JwtDto login(LoginDto loginDto);

    JwtDto googleLogin(GoogleLoginDto googleLoginDto) throws Exception;

    JwtDto refresh(RefreshTokenDto refreshTokenDto) throws Exception;
}
