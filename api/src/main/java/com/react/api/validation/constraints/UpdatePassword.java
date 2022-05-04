package com.react.api.validation.constraints;

import com.react.api.validation.validators.UpdatePasswordValidator;
import com.react.api.validation.validators.UserUniqueFieldValidator;
import com.react.api.validation.validators.UserUniqueTypeValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = {UpdatePasswordValidator.class})
@Target( {ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface UpdatePassword {
    int min();
    int max();
    String message() default "Password must be more than 6 characters and less than 12 characters";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
