package com.react.api.controller;

import com.react.api.common.ResponseBuilder;
import com.react.api.dto.use.UserCreateDto;
import com.react.api.dto.use.UserUpdateDto;
import com.react.api.model.User;

import com.react.api.repository.UserRepository;
import com.react.api.types.ApiData;
import com.react.api.types.ApiError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("api/user")
@PreAuthorize("hasAnyAuthority('USER')")
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public ResponseEntity<ApiData> get(@RequestParam(required = false, defaultValue = "0") Integer page, @RequestParam(required = false, defaultValue = "0") Integer perPage) {
        logger.info("get page:{}, perPage:{}", page, perPage);
        Sort sort = Sort.by("id");
        if (0 < perPage){
            PageRequest paging = PageRequest.of(page, perPage, sort);
            Page<User> users = userRepository.findAll(paging);
            return ResponseBuilder.page(users);
        }
        List<User> users = userRepository.findAll(sort);
        return ResponseBuilder.page(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiData> find(@PathVariable Integer id) {
        logger.info("find id:{}", id);
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("Entity not found");
        }
        return ResponseBuilder.ok(user.get());
    }

    @PostMapping
    public ResponseEntity<ApiData> create(@Valid @RequestBody UserCreateDto userDto) {
        logger.info("create UserCreateDto:{}", userDto);
        try {
            User user = new User();
            user.setFullName(userDto.getFullName());
            user.setUsername(userDto.getUsername());
            user.setStatus(userDto.getStatus());
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            user.setCreatedAt(LocalDateTime.now());
            user.setCreatedBy(1);
            userRepository.save(user);
            return ResponseBuilder.ok(user, HttpStatus.CREATED);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiData> update(@PathVariable Integer id, @Valid @RequestBody UserUpdateDto userDto) {
        logger.info("update id:{}, userDto:{}", id, userDto);
        Optional<User> oUser = userRepository.findById(id);
        if (oUser.isEmpty()) {
            throw new EntityNotFoundException("Entity not found");
        }
        try {
            User user = oUser.get();
            user.setFullName(userDto.getFullName());
            user.setUsername(userDto.getUsername());
            user.setStatus(userDto.getStatus());
            if (StringUtils.hasLength(userDto.getPassword())) {
                user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            }
            userRepository.save(user);
            return ResponseBuilder.ok(user);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiData> delete(@PathVariable Integer id) {
        logger.info("delete id:{}", id);
        Optional<User> oUser = userRepository.findById(id);
        if (oUser.isEmpty()) {
            throw new EntityNotFoundException("Entity not found");
        }
        try {
            userRepository.delete(oUser.get());
            return ResponseBuilder.ok(true);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }
}
