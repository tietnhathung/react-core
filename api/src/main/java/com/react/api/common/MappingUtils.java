package com.react.api.common;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MappingUtils {
    private final ModelMapper modelMapper;

    public MappingUtils(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public  <S, T> T map(S source, Class<T>  targetClass) {
        return modelMapper.map(source, targetClass);
    }
    public  <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
        return source.stream().map(element -> modelMapper.map(element, targetClass)).collect(Collectors.toList());
    }
}
