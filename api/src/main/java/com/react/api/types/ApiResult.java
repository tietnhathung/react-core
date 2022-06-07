package com.react.api.types;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ApiResult {
    private HttpStatus httpStatus;
    private Object content;
    private ApiError errors;
}