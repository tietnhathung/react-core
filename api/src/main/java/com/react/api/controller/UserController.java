package com.react.api.controller;

import com.react.api.common.ResponseBuilder;
import com.react.api.model.Account;
import com.react.api.repository.AccountRepository;

import com.react.api.types.ApiData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("api/user")
public class UserController {
    private final AccountRepository accountRepository;

    public UserController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @GetMapping
    public ResponseEntity<ApiData> get(){
        List<Account> account = accountRepository.findAll();
        return ResponseBuilder.ok(account);
    }
}
