package com.react.api.types;

import com.react.api.model.Menu;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class Pagination<T> {
    public Pagination(Page<T> listPage) {
        this.totalElements = listPage.getTotalElements();
        this.content = listPage.getContent();
    }
    private long totalElements;
    private List<T> content;
}