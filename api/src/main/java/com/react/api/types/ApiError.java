package com.react.api.types;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
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
        this.message = ex.getMessage();
        this.debugMessage = ex.getLocalizedMessage();
    }
    public ApiError(HttpStatus status, Throwable ex) {
        this();
        this.status = status;
        this.message = "Unexpected error";
        this.debugMessage = ex.getLocalizedMessage();
    }

    public ApiError(HttpStatus status, String message, Throwable ex) {
        this();
        this.status = status;
        this.message = message;
        this.debugMessage = ex.getLocalizedMessage();
    }
}
