package com.react.data.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public abstract class DtoMapperImpl<S, T> implements DtoMapper<S, T> {
    protected ModelMapper modelMapper;

    protected  DtoMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public T toDto(S s, Class<T> tClass) {
        if (Objects.isNull(s)) {
            return null;
        }

        return modelMapper.map(s, tClass);
    }

    @Override
    public List<T> toDto(List<S> s, Class<T> tClass) {
        List<T> tList = new ArrayList<>();
        if (Objects.isNull(s)) {
            return tList;
        }
        for (S s1 : s) {
            tList.add(toDto(s1, tClass));
        }
        return tList;
    }

    @Override
    public S toEntity(T t, Class<S> tClass) {
        if (Objects.isNull(t)) {
            return null;
        }
        return modelMapper.map(t, tClass);
    }

    @Override
    public List<S> toEntity(List<T> t, Class<S> tClass) {
        List<S> sList = new ArrayList<>();
        if (Objects.isNull(t)) {
            return sList;
        }
        for (T t1 : t) {
            sList.add(toEntity(t1, tClass));
        }
        return sList;
    }
}
