package com.react.api.hepers;

import com.react.data.types.ApiError;
import com.react.data.types.ApiResult;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseBuilder {

    public static <T> ResponseEntity<ApiResult> page(Page<T> pageData) {
        ApiResult apiResult = new ApiResult();
        apiResult.setHttpStatus(HttpStatus.OK);
        apiResult.setContent(pageData);
        return ResponseEntity.ok().body(apiResult);
    }

    public static ResponseEntity<ApiResult> ok() {
        ApiResult apiResult = new ApiResult();
        apiResult.setHttpStatus(HttpStatus.OK);
        return new ResponseEntity<>(apiResult, HttpStatus.OK);
    }

    public static ResponseEntity<ApiResult> ok(Object data) {
        ApiResult apiResult = new ApiResult();
        apiResult.setHttpStatus(HttpStatus.OK);
        apiResult.setContent(data);
        return ResponseEntity.ok().body(apiResult);
    }

    public static ResponseEntity<ApiResult> ok(Object data, HttpStatus status) {
        ApiResult apiResult = new ApiResult();
        apiResult.setHttpStatus(status);
        apiResult.setContent(data);
        return new ResponseEntity<>(apiResult, status);
    }

    public static ResponseEntity<ApiResult> found(ApiError errors) {
        ApiResult apiResult = new ApiResult();
        apiResult.setHttpStatus(errors.getStatus());
        apiResult.setErrors(errors);
        return new ResponseEntity<>(apiResult, errors.getStatus());
    }

    public static ResponseEntity<Object> buildError(ApiError errors, HttpStatus status) {
        ApiResult apiResult = new ApiResult();
        apiResult.setHttpStatus(status);
        apiResult.setErrors(errors);
        return new ResponseEntity<>(apiResult, status);
    }
}
