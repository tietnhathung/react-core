package com.react.data.mapper;

import com.react.data.dto.use.UserDto;
import com.react.data.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper( UserMapper.class );

    @Mapping(source = "fullName", target = "fullName")
    UserDto toDto(User User);

    @Mapping(source = "fullName", target = "fullName")
    User toEntity(UserDto dto);
}
