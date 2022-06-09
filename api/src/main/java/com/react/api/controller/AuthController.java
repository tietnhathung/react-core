package com.react.api.controller;

import com.react.api.common.ResponseBuilder;
import com.react.api.dto.auth.GoogleLoginDto;
import com.react.api.dto.auth.JwtDto;
import com.react.api.dto.auth.LoginDto;
import com.react.api.dto.auth.RefreshTokenDto;
import com.react.api.service.AuthService;
import com.react.api.types.ApiError;
import com.react.api.types.ApiResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600L)
@RestController
@RequestMapping("api/auth")
public class AuthController {
    private final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResult> login(@Valid @RequestBody LoginDto loginDto) {
        try {
            logger.info("Login username:{}, password:{}", loginDto.getUsername(), loginDto.getPassword());
            JwtDto jwtDto = authService.login(loginDto);
            return ResponseBuilder.ok(jwtDto);
        } catch (Exception ex) {
            ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
            apiError.setMessage(ex.getMessage());
            return ResponseBuilder.found(apiError);
        }
    }

    @PostMapping("/google/login")
    public ResponseEntity<ApiResult> googleLogin(@Valid @RequestBody GoogleLoginDto loginDto) {
        try {
            logger.info("googleLogin");
            JwtDto jwtDto = authService.googleLogin(loginDto);
            return ResponseBuilder.ok(jwtDto);
        } catch (Exception ex) {
            ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
            apiError.setMessage(ex.getMessage());
            return ResponseBuilder.found(apiError);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResult> refresh(@Valid @RequestBody RefreshTokenDto refreshTokenDto) {
        logger.info("refresh token");
        try {
            JwtDto jwtDto = authService.refresh(refreshTokenDto);
            return ResponseBuilder.ok(jwtDto);
        } catch (Exception ex) {
            ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
            apiError.setMessage(ex.getMessage());
            return ResponseBuilder.found(apiError);
        }
    }
}
