package com.react.api.controller;

import com.react.api.hepers.ResponseBuilder;
import com.react.data.dto.use.UserCreateDto;
import com.react.data.dto.use.UserDto;
import com.react.data.dto.use.UserUpdateDto;
import com.react.data.model.User;
import com.react.data.types.ApiError;
import com.react.data.types.ApiResult;
import com.react.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("api/user")
@PreAuthorize("hasAnyAuthority('USER')")
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResult> get(Pageable page) {
        logger.info("get User Pageable:{}", page.toString());
        Page<User> users = userService.get(page);
        return ResponseBuilder.page(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResult> find(@PathVariable Integer id) {
        logger.info("find id:{}", id);
        UserDto user = userService.get(id);
        return ResponseBuilder.ok(user);
    }

    @PostMapping
    public ResponseEntity<ApiResult> create(@Valid @RequestBody UserCreateDto userDto) {
        logger.info("create UserCreateDto:{}", userDto);
        try {
            UserDto user = userService.add(userDto);
            return ResponseBuilder.ok(user, HttpStatus.CREATED);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResult> update(@PathVariable Integer id, @Valid @RequestBody UserUpdateDto userDto) {
        logger.info("update id:{}, userDto:{}", id, userDto);
        try {
            UserDto user = userService.change(id, userDto);
            return ResponseBuilder.ok(user);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResult> delete(@PathVariable Integer id) {
        logger.info("delete id:{}", id);
        try {
            userService.delete(id);
            return ResponseBuilder.ok(true);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }
}
