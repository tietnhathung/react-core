package com.react.api.service;

import com.react.api.dto.use.UserCreateDto;
import com.react.api.dto.use.UserDto;
import com.react.api.dto.use.UserUpdateDto;
import com.react.api.model.User;
import com.react.api.types.Pagination;


public interface UserService {
    Pagination<UserDto> findAll(Integer page, Integer perPage);
    UserDto find(Integer id);
    UserDto create(UserCreateDto userForm);
    UserDto update(Integer id,UserUpdateDto userForm);
    void delete(Integer id);
}
