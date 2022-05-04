package com.react.api.configuration;

import com.react.api.common.ResponseBuilder;
import com.react.api.types.ApiError;
import com.react.api.types.ApiSubError;
import com.react.api.types.ApiValidationError;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class RestApiExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<ApiSubError> errors = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            ApiValidationError validationError = new ApiValidationError(error.getObjectName());
            if (error instanceof FieldError) {
                String fieldName = ((FieldError) error).getField();
                validationError.setField(fieldName);
                validationError.setRejectedValue(((FieldError) error).getRejectedValue());
                validationError.setMessage(String.format("%s: %s", fieldName, error.getDefaultMessage()));
            } else {
                validationError.setMessage(String.format("%s: %s", error.getObjectName(), error.getDefaultMessage()));
            }
            errors.add(validationError);
        });
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
        apiError.setMessage("Form Error Validation");
        apiError.setSubErrors(errors);
        return ResponseBuilder.buildObject(null, apiError, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    protected ResponseEntity<Object> handleEntityNotFound(EntityNotFoundException ex) {
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
        apiError.setMessage(ex.getMessage());
        return ResponseBuilder.buildObject(null, apiError, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(AuthenticationException.class)
    protected ResponseEntity<Object> handleAuthenticationException(AuthenticationException ex) {
        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
        apiError.setMessage(ex.getMessage());
        return ResponseBuilder.buildObject(null, apiError, HttpStatus.UNAUTHORIZED);
    }
}
