package com.react.service;

import com.react.common.dto.use.UserCreateDto;
import com.react.common.dto.use.UserUpdateDto;
import com.react.data.model.User;
import com.react.common.types.Pagination;


public interface UserService {
    Pagination<User> findAll(Integer page, Integer perPage);

    User find(Integer id);

    User create(UserCreateDto userForm);

    User update(Integer id, UserUpdateDto userForm);

    void delete(Integer id);
}
