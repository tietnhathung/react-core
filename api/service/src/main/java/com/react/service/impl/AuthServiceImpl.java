package com.react.service.impl;

import com.react.data.dto.auth.GoogleLoginDto;
import com.react.data.dto.auth.JwtDto;
import com.react.data.dto.auth.LoginDto;
import com.react.data.dto.auth.RefreshTokenDto;
import com.react.common.helpers.JwtUtils;
import com.react.data.types.GoogleProfile;
import com.react.service.AuthService;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class AuthServiceImpl implements AuthService {
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final RestTemplate restTemplate;
    private final UserDetailsServiceImpl userDetailsService;

    public AuthServiceImpl(JwtUtils jwtUtils, AuthenticationManager authenticationManager, RestTemplate restTemplate, UserDetailsServiceImpl userDetailsService) {
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.restTemplate = restTemplate;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public JwtDto login(LoginDto loginDto) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtils.generateJwtToken(authentication);
        String refreshToken = jwtUtils.generateJwtRefreshToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        JwtDto jwtDto = new JwtDto();
        jwtDto.setUser(userDetails);
        jwtDto.setAccessToken(token);
        jwtDto.setRefreshToken(refreshToken);
        return jwtDto;
    }

    @Override
    public JwtDto googleLogin(GoogleLoginDto loginDto) throws AuthenticationException {
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
            jwtDto.setUser(userDetails);
            jwtDto.setAccessToken(token);
            jwtDto.setRefreshToken(refreshToken);
            return jwtDto;
        }
        throw new AuthenticationException("Can't get google profile");
    }

    @Override
    public JwtDto refresh(RefreshTokenDto refreshTokenDto) throws AuthenticationException {
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
            return jwtDto;
        }
        throw new AuthenticationException("refresh token failure");
    }
}
