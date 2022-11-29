package com.react.data.mapper;

import com.react.data.dto.use.UserDto;
import com.react.data.model.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Component;

@Component
public class UserMapper extends DtoMapperImpl<User, UserDto> {
    public UserMapper(ModelMapper modelMapper) {
        super(modelMapper);
        TypeMap<User, UserDto> propertyMapper = modelMapper.createTypeMap(User.class, UserDto.class);
        propertyMapper.addMappings(mapper -> mapper.map(User::getRules, UserDto::setRules));
        this.modelMapper = modelMapper;
    }
}
