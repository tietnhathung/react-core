package com.react.data.type;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ApiResult {
    private HttpStatus httpStatus;
    private Object content;
    private ApiError errors;
}
