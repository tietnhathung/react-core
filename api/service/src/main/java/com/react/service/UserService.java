package com.react.service;

import com.react.data.dto.use.UserCreateDto;
import com.react.data.dto.use.UserDto;
import com.react.data.dto.use.UserUpdateDto;
import com.react.data.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface UserService {
    Page<User> get(Pageable page);
    UserDto get(Integer id);

    UserDto add(UserCreateDto userForm);

    UserDto change(Integer id, UserUpdateDto userForm);

    void delete(Integer id);
}
