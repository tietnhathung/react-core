package com.example.demo.common;

import com.example.demo.types.ApiData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseBuilder {
    public static ResponseEntity<ApiData> ok(Object data){
        ApiData apiData = new ApiData();
        apiData.setHttpStatus(HttpStatus.OK.value());
        apiData.setContent(data);
        return ResponseEntity.ok().body(apiData);
    }
}
