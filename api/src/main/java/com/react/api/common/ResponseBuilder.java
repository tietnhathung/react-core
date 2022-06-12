package com.react.api.common;

import com.react.api.types.ApiResult;
import com.react.api.types.ApiError;
import com.react.api.types.Pagination;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class ResponseBuilder {
    public static <T> ResponseEntity<ApiResult> page(List<T> pageData) {
        ApiResult apiResult = new ApiResult();
        apiResult.setHttpStatus(HttpStatus.OK);
        Pagination<T> pagination = new Pagination<>(pageData);
        apiResult.setContent(pagination);
        return ResponseEntity.ok().body(apiResult);
    }

    public static <T> ResponseEntity<ApiResult> page(Pagination<T> pageData) {
        ApiResult apiResult = new ApiResult();
        apiResult.setHttpStatus(HttpStatus.OK);
        apiResult.setContent(pageData);
        return ResponseEntity.ok().body(apiResult);
    }

    public static <T> ResponseEntity<ApiResult> page(Page<T> pageData) {
        ApiResult apiResult = new ApiResult();
        apiResult.setHttpStatus(HttpStatus.OK);
        Pagination<T> pagination = new Pagination<>(pageData);
        apiResult.setContent(pagination);
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
