package com.react.api.controller;

import com.react.api.common.JwtUtils;
import com.react.api.common.ResponseBuilder;
import com.react.api.dto.auth.JwtDto;
import com.react.api.dto.auth.LoginDto;
import com.react.api.repository.UserRepository;
import com.react.api.service.UserDetailsImpl;
import com.react.api.types.ApiData;
import com.react.api.types.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiData> authenticateUser(@Valid @RequestBody LoginDto loginDto) {
        try {

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtUtils.generateJwtToken(authentication);
            String refreshToken = jwtUtils.generateJwtRefreshToken(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            JwtDto jwtDto = new JwtDto();
            jwtDto.setUser(userDetails);
            jwtDto.setAccess_token(token);
            jwtDto.setRefresh_token(refreshToken);
            return ResponseBuilder.ok(jwtDto);
        } catch (Exception ex) {
            ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
            apiError.setMessage(ex.getMessage());
            return ResponseBuilder.found(apiError);
        }
    }
}
