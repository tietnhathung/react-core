package com.example.demo.controller;

import com.example.demo.common.ResponseBuilder;
import com.example.demo.model.Account;
import com.example.demo.repository.AccountRepository;

import com.example.demo.types.ApiData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.AbstractMap;
import java.util.List;
import java.util.Map;


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
