package com.react.common.Utils;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class MappingUtils {
    private final ModelMapper modelMapper;

    public MappingUtils(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public  <S, T> T map(S source, Class<T>  targetClass) {
        if (Objects.isNull(source)){
            return null;
        }
        modelMapper.createTypeMap(source.getClass(),targetClass);
        return modelMapper.map(source, targetClass);
    }

    public <S, T> List<T> map(List<S> source, Class<T> targetClass) {
        if (Objects.isNull(source)){
            return null;
        }
        List<T> maps  = new ArrayList<>();
        for (S s : source) {
            maps.add( map( s ,targetClass) );
        }
        return maps;
    }

    public <S, D> TypeMap<S, D> createTypeMap(Class<S> sourceType, Class<D> destinationType) {
        return modelMapper.createTypeMap(sourceType,destinationType);
    }
}
