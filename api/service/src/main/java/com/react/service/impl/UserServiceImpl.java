package com.react.service.impl;

import com.react.common.dto.use.UserCreateDto;
import com.react.common.dto.use.UserDto;
import com.react.common.dto.use.UserUpdateDto;
import com.react.common.helpers.MappingUtils;
import com.react.common.types.Pagination;
import com.react.data.model.Rule;
import com.react.data.model.User;
import com.react.data.repository.UserRepository;
import com.react.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final MappingUtils mappingUtils;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, MappingUtils mappingUtils, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.mappingUtils = mappingUtils;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Pagination<User> findAllTest(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return new Pagination<>(users);
    }

    @Override
    public Pagination<User> findAll(Integer page, Integer perPage) {
        Sort sort = Sort.by("id");
        if (0 < perPage) {
            PageRequest paging = PageRequest.of(page, perPage, sort);
            Page<User> users = userRepository.findAll(paging);
            return new Pagination<>(users);
        }
        List<User> users = userRepository.findAll(sort);
        return new Pagination<>(users);
    }

    @Override
    public UserDto find(Integer id) {
        Optional<User> oUser = userRepository.findById(id);
        if (oUser.isEmpty()) {
            throw new EntityNotFoundException("Entity not found");
        }
        User user = oUser.get();
        return new UserDto(user);
    }

    @Override
    public UserDto create(UserCreateDto userForm) {
        User user = new User();
        user.setFullName(userForm.getFullName());
        user.setUsername(userForm.getUsername());
        user.setStatus(userForm.getStatus());
        user.setPassword(passwordEncoder.encode(userForm.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        user.setAccessTokenApp("");
        user.setCreatedBy(1);
        List<Rule> rules = mappingUtils.mapList(userForm.getRules(), Rule.class);
        user.setRules(rules);
        return new UserDto(userRepository.save(user));
    }

    @Override
    public UserDto update(Integer id, UserUpdateDto userForm) {
        Optional<User> oUser = userRepository.findById(id);
        if (oUser.isEmpty()) {
            throw new EntityNotFoundException("Entity not found");
        }
        User user = oUser.get();
        user.setFullName(userForm.getFullName());
        user.setUsername(userForm.getUsername());
        user.setStatus(userForm.getStatus());
        if (StringUtils.hasLength(userForm.getPassword())) {
            user.setPassword(passwordEncoder.encode(userForm.getPassword()));
        }
        List<Rule> rules = mappingUtils.mapList(userForm.getRules(), Rule.class);
        user.setRules(rules);
        return new UserDto(userRepository.save(user));
    }

    @Override
    public void delete(Integer id) {
        Optional<User> oUser = userRepository.findById(id);
        if (oUser.isEmpty()) {
            throw new EntityNotFoundException("Entity not found");
        }
        userRepository.delete(oUser.get());
    }
}
