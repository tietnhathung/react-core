package com.react.api.common;

import com.react.api.types.ApiData;
import com.react.api.types.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseBuilder {
    public static ResponseEntity<ApiData> ok(Object data){
        ApiData apiData = new ApiData();
        apiData.setHttpStatus(HttpStatus.OK);
        apiData.setContent(data);
        return ResponseEntity.ok().body(apiData);
    }
    public static ResponseEntity<ApiData> ok(Object data,HttpStatus status){
        ApiData apiData = new ApiData();
        apiData.setHttpStatus(status);
        apiData.setContent(data);
        return new ResponseEntity<>(apiData,status);
    }
    public static ResponseEntity<ApiData> found(ApiError errors){
        ApiData apiData = new ApiData();
        apiData.setHttpStatus(errors.getStatus());
        apiData.setErrors(errors);
        return new ResponseEntity<>(apiData,errors.getStatus());
    }
    public static ResponseEntity<ApiData> build(Object data,ApiError errors,HttpStatus status){
        ApiData apiData = new ApiData();
        apiData.setHttpStatus(status);
        apiData.setContent(data);
        apiData.setErrors(errors);
        return new ResponseEntity<>(apiData,status);
    }

    public static ResponseEntity<Object> buildObject(Object data,ApiError errors,HttpStatus status){
        ApiData apiData = new ApiData();
        apiData.setHttpStatus(status);
        apiData.setContent(data);
        apiData.setErrors(errors);
        return new ResponseEntity<>(apiData,status);
    }
}
