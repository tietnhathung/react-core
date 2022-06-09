package com.react.api.dto.use;

import com.react.api.dto.rule.RuleDto;
import com.react.api.model.User;
import com.react.api.validation.constraints.UserUnique;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@UserUnique
public class UserDto implements Serializable {
    private Integer id;
    @NotBlank
    @Size(max = 20, min = 6)
    @NotNull
    private String username;

    @NotEmpty
    @Size(max = 255, min = 4)
    @NotNull
    private String fullName;

    @NotNull
    private Boolean status;

    private LocalDateTime createdAt;

    @NotNull
    private List<RuleDto> rules = new ArrayList<>();

}
