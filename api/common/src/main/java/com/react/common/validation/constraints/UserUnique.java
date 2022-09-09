package com.react.common.validation.constraints;

import com.react.common.validation.validators.UserUniqueFieldValidator;
import com.react.common.validation.validators.UserUniqueTypeValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = {UserUniqueTypeValidator.class, UserUniqueFieldValidator.class})
@Target({ElementType.FIELD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface UserUnique {
    String message() default "must be unique";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
