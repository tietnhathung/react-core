package com.react.common.validation.validators;

import com.react.common.dto.use.UserDto;
import com.react.data.model.User;
import com.react.data.repository.UserRepository;
import com.react.common.validation.constraints.UserUnique;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Objects;
import java.util.Optional;

public class UserUniqueTypeValidator implements ConstraintValidator<UserUnique, UserDto> {
    private final UserRepository userRepository;

    public UserUniqueTypeValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public void initialize(UserUnique constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(UserDto userDto, ConstraintValidatorContext context) {
        boolean valid = true;
        Optional<User> oUser = userRepository.findByUsername(userDto.getUsername());
        if (oUser.isPresent()) {
            User user = oUser.get();
            valid = Objects.equals(user.getId(), userDto.getId());
        }
        if (!valid) {
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
                    .addPropertyNode("username")
                    .addConstraintViolation()
                    .disableDefaultConstraintViolation();
        }
        return valid;
    }
}
