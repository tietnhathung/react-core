package com.react.api.service;

import com.react.api.dto.use.UserCreateDto;
import com.react.api.dto.use.UserUpdateDto;
import com.react.api.model.User;
import com.react.api.types.Pagination;


public interface UserService {
    Pagination<User> findAll(Integer page, Integer perPage);

    User find(Integer id);

    User create(UserCreateDto userForm);

    User update(Integer id, UserUpdateDto userForm);

    void delete(Integer id);
}
