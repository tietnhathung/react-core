package com.react.api.controller;

import com.react.api.common.ResponseBuilder;
import com.react.api.dto.use.UserCreateDto;
import com.react.api.dto.use.UserUpdateDto;

import com.react.api.model.User;
import com.react.api.service.UserService;
import com.react.api.types.ApiResult;
import com.react.api.types.ApiError;
import com.react.api.types.Pagination;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    public ResponseEntity<ApiResult> get(@RequestParam(required = false, defaultValue = "0") Integer page, @RequestParam(required = false, defaultValue = "0") Integer perPage) {
        logger.info("get page:{}, perPage:{}", page, perPage);
        Pagination<User> users = userService.findAll(page, perPage);
        return ResponseBuilder.page(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResult> find(@PathVariable Integer id) {
        logger.info("find id:{}", id);
        User user = userService.find(id);
        return ResponseBuilder.ok(user);
    }

    @PostMapping
    public ResponseEntity<ApiResult> create(@Valid @RequestBody UserCreateDto userDto) {
        logger.info("create UserCreateDto:{}", userDto);
        try {
            User user = userService.create(userDto);
            return ResponseBuilder.ok(user, HttpStatus.CREATED);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResult> update(@PathVariable Integer id, @Valid @RequestBody UserUpdateDto userDto) {
        logger.info("update id:{}, userDto:{}", id, userDto);
        try {
            User user = userService.update(id, userDto);
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
