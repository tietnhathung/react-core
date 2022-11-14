package com.react.service;

import com.react.common.dto.use.UserCreateDto;
import com.react.common.dto.use.UserDto;
import com.react.common.dto.use.UserUpdateDto;
import com.react.data.model.User;
import com.react.common.types.Pagination;
import org.springframework.data.domain.Pageable;


public interface UserService {
    Pagination<User> get(Pageable page);
    UserDto get(Integer id);

    UserDto add(UserCreateDto userForm);

    UserDto change(Integer id, UserUpdateDto userForm);

    void delete(Integer id);
}
