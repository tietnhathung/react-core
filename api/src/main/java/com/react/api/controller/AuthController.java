package com.react.api.controller;

import com.react.api.common.JwtUtils;
import com.react.api.common.ResponseBuilder;
import com.react.api.dto.auth.JwtDto;
import com.react.api.dto.auth.LoginDto;
import com.react.api.dto.auth.RefreshTokenDto;
import com.react.api.dto.auth.googleLoginDto;
import com.react.api.service.UserDetailsImpl;
import com.react.api.service.UserDetailsServiceImpl;
import com.react.api.types.ApiResult;
import com.react.api.types.ApiError;
import com.react.api.types.GoogleProfile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.net.http.HttpHeaders;

@CrossOrigin(origins = "*", maxAge = 3600L)
@RestController
@RequestMapping("api/auth")
public class AuthController {
    private final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;
    private final RestTemplate restTemplate;

    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserDetailsServiceImpl userDetailsService, RestTemplate restTemplate) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
        this.restTemplate = restTemplate;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResult> login(@Valid @RequestBody LoginDto loginDto) {
        try {
            logger.info("Login username:{}, password:{}", loginDto.getUsername(), loginDto.getPassword());
            Authentication authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtUtils.generateJwtToken(authentication);
            String refreshToken = jwtUtils.generateJwtRefreshToken(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            JwtDto jwtDto = new JwtDto();
            jwtDto.setUser(userDetails);
            jwtDto.setAccessToken(token);
            jwtDto.setRefreshToken(refreshToken);
            return ResponseBuilder.ok(jwtDto);
        } catch (Exception ex) {
            ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
            apiError.setMessage(ex.getMessage());
            return ResponseBuilder.found(apiError);
        }
    }

    @PostMapping("/google/login")
    public ResponseEntity<ApiResult> googleLogin(@Valid @RequestBody googleLoginDto loginDto) {
        try {
            logger.info("googleLogin");
            MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
            headers.add("Authorization", "Bearer "+loginDto.getAccess_token());

            HttpEntity<String> httpEntity = new HttpEntity<>(headers);

            String url = "https://www.googleapis.com/oauth2/v3/userinfo";

            ResponseEntity<GoogleProfile> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, GoogleProfile.class);
            GoogleProfile profile = response.getBody();
            if (response.getStatusCode() == HttpStatus.OK && profile != null){

                UserDetails userDetails = userDetailsService.loadUserByUsername(profile.getEmail());

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);

                String token = jwtUtils.generateJwtToken(authentication);

                String refreshToken = jwtUtils.generateJwtRefreshToken(authentication);
                JwtDto jwtDto = new JwtDto();
                jwtDto.setUser((UserDetailsImpl) userDetails);
                jwtDto.setAccessToken(token);
                jwtDto.setRefreshToken(refreshToken);
                return ResponseBuilder.ok(jwtDto);
            }

            ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
            return ResponseBuilder.found(apiError);
        } catch (Exception ex) {
            ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
            apiError.setMessage(ex.getMessage());
            return ResponseBuilder.found(apiError);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResult> refresh(@Valid @RequestBody RefreshTokenDto refreshTokenDto) {
        logger.info("refresh token");
        String errorMessage;
        try {
            if (jwtUtils.validateJwtToken(refreshTokenDto.getRefreshToken())) {
                String username = jwtUtils.getUserNameFromJwtToken(refreshTokenDto.getRefreshToken());
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                Authentication authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                String token = jwtUtils.generateJwtToken(authenticationToken);
                String refreshToken = jwtUtils.generateJwtRefreshToken(authenticationToken);
                UserDetailsImpl userDetailsImpl = (UserDetailsImpl) userDetails;
                JwtDto jwtDto = new JwtDto();
                jwtDto.setUser(userDetailsImpl);
                jwtDto.setAccessToken(token);
                jwtDto.setRefreshToken(refreshToken);
                return ResponseBuilder.ok(jwtDto);
            }
            errorMessage = "refresh token failure";
        } catch (Exception ex) {
            errorMessage = ex.getMessage();
        }
        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
        apiError.setMessage(errorMessage);
        return ResponseBuilder.found(apiError);
    }
}
