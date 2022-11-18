package com.react.api.controller;

import com.react.api.hepers.ResponseBuilder;
import com.react.data.model.User;
import com.react.data.type.ApiResult;
import com.react.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/test")
public class TestController {
    private final UserService userService;

    public TestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<ApiResult> get(Pageable page) {
        Page<User> users = userService.get(page);
        return ResponseBuilder.page(users);
    }
}
