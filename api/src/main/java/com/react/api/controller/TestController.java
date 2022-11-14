package com.react.api.controller;

import com.react.common.helpers.ResponseBuilder;
import com.react.common.types.ApiResult;
import com.react.common.types.Pagination;
import com.react.data.model.User;
import com.react.service.UserService;
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
        Pagination<User> users = userService.get(page);
        return ResponseBuilder.page(users);
    }
}
