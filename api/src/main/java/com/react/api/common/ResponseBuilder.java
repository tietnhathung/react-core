package com.react.api.common;

import com.react.api.types.ApiData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseBuilder {
    public static ResponseEntity<ApiData> ok(Object data){
        ApiData apiData = new ApiData();
        apiData.setHttpStatus(HttpStatus.OK.value());
        apiData.setContent(data);
        return ResponseEntity.ok().body(apiData);
    }
    public static ResponseEntity<ApiData> found(Exception errors){
        ApiData apiData = new ApiData();
        apiData.setHttpStatus(HttpStatus.FOUND.value());
        apiData.setContent(errors);
        return new ResponseEntity<>(apiData,HttpStatus.FOUND);
    }
    public static ResponseEntity<ApiData> build(Object data,HttpStatus status){
        ApiData apiData = new ApiData();
        apiData.setHttpStatus(status.value());
        apiData.setContent(data);
        return new ResponseEntity<>(apiData,status);
    }

    public static ResponseEntity<Object> buildObject(Object data,HttpStatus status){
        ApiData apiData = new ApiData();
        apiData.setHttpStatus(status.value());
        apiData.setContent(data);
        return new ResponseEntity<>(apiData,status);
    }
}
