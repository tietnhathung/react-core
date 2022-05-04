package com.react.api.validation.validators;

import com.react.api.dto.use.UserUpdateDto;
import com.react.api.model.User;
import com.react.api.repository.UserRepository;
import com.react.api.validation.constraints.UserUnique;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Objects;
import java.util.Optional;

public class UserUniqueTypeValidator implements ConstraintValidator<UserUnique, UserUpdateDto> {
    private final UserRepository userRepository;

    public UserUniqueTypeValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public void initialize(UserUnique constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(UserUpdateDto userDto, ConstraintValidatorContext context) {

        Optional<User> oUser = userRepository.findByUsername(userDto.getUsername());

        if (oUser.isPresent()) {
            User user = oUser.get();
            return Objects.equals(user.getId(), userDto.getId());
        }
        return true;
    }
}
