package com.react.api.controller;

import com.react.common.helpers.ResponseBuilder;
import com.react.common.types.ApiResult;
import com.react.common.types.Pagination;
import com.react.data.model.User;
import com.react.service.UserService;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/test")
public class TestController {
    private final UserService userService;

    public TestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("test1")
    public ResponseEntity<ApiResult> get(@RequestParam(required = false, defaultValue = "0") Integer page, @RequestParam(required = false, defaultValue = "0") Integer perPage) {
        Pagination<User> users = userService.findAll(page, perPage);
        return ResponseBuilder.page(users);
    }

    @GetMapping("testPage")
    public ResponseEntity<ApiResult> getPaging(Pageable pageable) {
        Pagination<User> users = userService.findAllTest(pageable);
        return ResponseBuilder.page(users);
    }


    @GetMapping("test2")
    public String test2() {
        return "Tes2";
    }
}
