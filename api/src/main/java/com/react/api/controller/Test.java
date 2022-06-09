package com.react.api.controller;

import com.react.api.common.ResponseBuilder;
import com.react.api.dto.use.UserDto;
import com.react.api.service.UserService;
import com.react.api.types.ApiResult;
import com.react.api.types.Pagination;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/test")
public class Test {
    private final UserService userService;

    public Test(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("test1")
    public ResponseEntity<ApiResult> get(@RequestParam(required = false, defaultValue = "0") Integer page, @RequestParam(required = false, defaultValue = "0") Integer perPage) {
        Pagination<UserDto> users = userService.findAll(page, perPage);
        return ResponseBuilder.page(users);
    }
    @GetMapping("test2")
    public String test2(){
        return "Tes2";
    }
}
