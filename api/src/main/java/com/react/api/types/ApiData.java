package com.react.api.types;

import lombok.Data;

@Data
public class ApiData {
    private int httpStatus;
    private Object content;
}
