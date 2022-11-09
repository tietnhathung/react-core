package com.react.service;

import com.react.common.dto.use.UserCreateDto;
import com.react.common.dto.use.UserDto;
import com.react.common.dto.use.UserUpdateDto;
import com.react.data.model.User;
import com.react.common.types.Pagination;
import org.springframework.data.domain.Pageable;


public interface UserService {
    Pagination<User> findAllTest(Pageable pageable);
    Pagination<User> findAll(Integer page, Integer perPage);

    UserDto find(Integer id);

    UserDto create(UserCreateDto userForm);

    UserDto update(Integer id, UserUpdateDto userForm);

    void delete(Integer id);
}
