package com.react.api.validation.validators;

import com.react.api.validation.constraints.UpdatePassword;
import org.springframework.util.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UpdatePasswordValidator implements ConstraintValidator<UpdatePassword, String> {
    private int min;
    private int max;

    @Override
    public void initialize(UpdatePassword constraintAnnotation) {
        min = constraintAnnotation.min();
        max = constraintAnnotation.max();
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return !StringUtils.hasLength(value) || (value.length() >= this.min && value.length() <= this.max);
    }

}
