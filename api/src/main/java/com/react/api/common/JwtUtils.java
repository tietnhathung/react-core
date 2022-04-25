package com.react.api.common;

import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class JwtUtil {
    private final String SECRET_KEY = "secret";

    public String extractUsername(String token){
        return extractClaim
    }
    public <T> T extractClaim(String token, Function<Claims,T> claimsResolver){
        final Claims claims =
    }

}
