package com.react.data.mapper;

import java.util.List;

public interface DtoMapper<S,T> {
    T toDto(S s,Class<T> tClass);

    List<T> toDto(List<S> s,Class<T> tClass);

    S toEntity(T s,Class<S> tClass);

    List<S> toEntity(List<T> s,Class<S> tClass);
}
