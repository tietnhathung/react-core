package com.react.service.impl;

import com.react.data.dto.use.UserCreateDto;
import com.react.data.dto.use.UserDto;
import com.react.data.dto.use.UserUpdateDto;
import com.react.common.Utils.MappingUtils;
import com.react.data.model.Rule;
import com.react.data.model.User;
import com.react.data.repository.UserRepository;
import com.react.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<User> get(Pageable page) {
        return userRepository.findAll(page);
    }

    @Override
    public UserDto get(Integer id) {
        Optional<User> oUser = userRepository.findById(id);
        if (oUser.isEmpty()) {
            throw new EntityNotFoundException("Entity not found");
        }
        User user = oUser.get();
        return new UserDto(user);
    }

    @Override
    public UserDto add(UserCreateDto userForm) {
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
    public UserDto change(Integer id, UserUpdateDto userForm) {
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
