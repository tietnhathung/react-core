package com.react.common.validation.validators;

import com.react.data.model.User;
import com.react.data.repository.UserRepository;
import com.react.common.validation.constraints.UserUnique;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Optional;

public class UserUniqueFieldValidator implements ConstraintValidator<UserUnique, String> {
    private final UserRepository userRepository;

    public UserUniqueFieldValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public void initialize(UserUnique constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        Optional<User> oUser = userRepository.findByUsername(username);
        return oUser.isEmpty();
    }
}