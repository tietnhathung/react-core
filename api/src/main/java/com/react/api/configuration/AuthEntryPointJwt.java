package com.react.api.configuration;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.react.api.types.ApiResult;
import com.react.api.types.ApiError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {
    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        logger.error("Unauthorized error: {}", authException.getMessage());
        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
        apiError.setMessage(authException.getMessage());
        ApiResult apiResult = new ApiResult();
        apiResult.setHttpStatus(HttpStatus.UNAUTHORIZED);
        apiResult.setErrors(apiError);
        Gson gson = new GsonBuilder().serializeNulls().create();
        PrintWriter out = response.getWriter();
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.print(gson.toJson(apiResult));
        out.flush();
    }

}
