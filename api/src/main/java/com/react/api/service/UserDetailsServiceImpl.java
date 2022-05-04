package com.react.api.service;

import com.react.api.model.User;
import com.react.api.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> oUser = userRepository.findByUsername(username);
        if (oUser.isEmpty()){
            throw new UsernameNotFoundException("Can't find user with name "+username);
        }
        return new UserDetailsImpl(oUser.get());
    }
}
