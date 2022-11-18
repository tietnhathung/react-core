package com.react.data.types;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
public class ApiError {
    private HttpStatus status;
    private String message;
    private String debugMessage;

    private List<ApiSubError> subErrors;
    private ApiError() {
    }

    public ApiError(HttpStatus status) {
        this();
        this.status = status;
    }
    public ApiError(Exception ex) {
        this();
        this.status = HttpStatus.FOUND;
        this.message = "Found";
        this.debugMessage = ex.getMessage();
    }
}
