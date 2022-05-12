package com.react.api.common;

import com.react.api.types.ApiData;
import com.react.api.types.ApiError;
import com.react.api.types.Pagination;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class ResponseBuilder {
    public static <T>ResponseEntity<ApiData> page(List<T> pageData){
        ApiData apiData = new ApiData();
        apiData.setHttpStatus(HttpStatus.OK);
        Pagination<T> pagination = new Pagination<>(pageData);
        apiData.setContent(pagination);
        return ResponseEntity.ok().body(apiData);
    }
    public static <T>ResponseEntity<ApiData> page(Page<T> pageData){
        ApiData apiData = new ApiData();
        apiData.setHttpStatus(HttpStatus.OK);
        Pagination<T> pagination = new Pagination<>(pageData);
        apiData.setContent(pagination);
        return ResponseEntity.ok().body(apiData);
    }
    public static ResponseEntity<ApiData> ok(){
        ApiData apiData = new ApiData();
        apiData.setHttpStatus(HttpStatus.OK);
        return new ResponseEntity<>(apiData,HttpStatus.OK);
    }
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

    public static ResponseEntity<Object> buildError(ApiError errors,HttpStatus status){
        ApiData apiData = new ApiData();
        apiData.setHttpStatus(status);
        apiData.setErrors(errors);
        return new ResponseEntity<>(apiData,status);
    }
}
