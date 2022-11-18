package com.react.api.configuration;

import com.react.api.hepers.ResponseBuilder;
import com.react.data.types.ApiError;
import com.react.data.types.ApiSubError;
import com.react.data.types.ApiValidationError;
import org.hibernate.exception.GenericJDBCException;
import org.modelmapper.MappingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.security.access.AccessDeniedException;
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
    private final Logger logger = LoggerFactory.getLogger(RestApiExceptionHandler.class);
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        logger.debug(ex.getMessage(),ex);
        List<ApiSubError> errors = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            ApiValidationError validationError = new ApiValidationError(error.getObjectName());
            if (error instanceof FieldError) {
                String fieldName = ((FieldError) error).getField();
                validationError.setField(fieldName);
                validationError.setRejectedValue(((FieldError) error).getRejectedValue());
            }
            validationError.setMessage(error.getDefaultMessage());
            errors.add(validationError);
        });
        ApiError apiError = new ApiError(status);
        apiError.setMessage("Form Error Validation");
        apiError.setSubErrors(errors);
        return ResponseBuilder.buildError(apiError, status);
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status, WebRequest request) {
        logger.debug(ex.getMessage(),ex);
        ApiError apiError = new ApiError(status);
        apiError.setMessage(ex.getMessage());
        return ResponseBuilder.buildError(apiError, status);
    }

    @ExceptionHandler({GenericJDBCException.class, JpaSystemException.class})
    public ResponseEntity<Object> handleExceptionJpa(Exception ex) {
        logger.debug(ex.getMessage(),ex);
        ApiError apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR);
        apiError.setMessage(ex.getMessage());
        return ResponseBuilder.buildError(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(EntityNotFoundException.class)
    protected ResponseEntity<Object> handleExceptionEntityNotFound(EntityNotFoundException ex) {
        logger.debug(ex.getMessage(),ex);
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
        apiError.setMessage(ex.getMessage());
        return ResponseBuilder.buildError(apiError, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AuthenticationException.class)
    protected ResponseEntity<Object> handleExceptionAuthentication(AuthenticationException ex) {
        logger.debug(ex.getMessage(),ex);
        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
        apiError.setMessage(ex.getMessage());
        return ResponseBuilder.buildError(apiError, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public final ResponseEntity<Object> handleExceptionAccessDenied(AccessDeniedException ex) {
        logger.debug(ex.getMessage(),ex);
        ApiError apiError = new ApiError(HttpStatus.FORBIDDEN);
        apiError.setMessage(ex.getMessage());
        return ResponseBuilder.buildError(apiError, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(HttpMessageConversionException.class)
    public final ResponseEntity<Object> handleHttpMessageConversion(HttpMessageConversionException ex) {
        logger.debug(ex.getMessage(),ex);
        ApiError apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR);
        apiError.setMessage(ex.getMessage());
        return ResponseBuilder.buildError(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(MappingException.class)
    public final ResponseEntity<Object> handleMappingException(MappingException ex) {
        logger.debug(ex.getMessage(),ex);
        ApiError apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR);
        apiError.setMessage(ex.getMessage());
        return ResponseBuilder.buildError(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
