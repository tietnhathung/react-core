package com.react.api.controller;

import com.react.api.common.ResponseBuilder;
import com.react.api.dto.UserDto;
import com.react.api.model.User;

import com.react.api.repository.UserRepository;
import com.react.api.types.ApiData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;


@RestController
@RequestMapping("api/user")
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public ResponseEntity<ApiData> get(@RequestParam(required = false, defaultValue = "0") int page,@RequestParam(required = false, defaultValue = "0") int perPage) {

        Sort sort = Sort.by("id");
        PageRequest paging =  PageRequest.of(page, perPage > 0 ? perPage : Integer.MAX_VALUE,sort);
        Page<User> users = userRepository.findAll(paging);

        return ResponseBuilder.ok(users);
    }

    @PostMapping
    public ResponseEntity<ApiData> create(@Valid @RequestBody UserDto userDto) {
        try {
            User user = new User();
            user.setFullName(userDto.getFullName());
            user.setUsername(userDto.getUsername());
            user.setPassword(passwordEncoder.encode(userDto.getUsername()));
            user.setCreatedAt(LocalDateTime.now());
            user.setCreatedBy(1);
            userRepository.save(user);
            return ResponseBuilder.build(user, HttpStatus.CREATED);
        } catch (Exception errors) {
            return ResponseBuilder.found(errors);
        }
    }
}
