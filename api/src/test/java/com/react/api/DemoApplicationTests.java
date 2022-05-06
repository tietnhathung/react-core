package com.react.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.react.api.model.User;
import com.react.api.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@SpringBootTest
class DemoApplicationTests {
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;

    @Test
    void contextLoads() {
    }

    @Test
    void createUser() {
        User user = new User();
        user.setFullName("Tiết Nhật Hưng");
        user.setStatus(true);
        user.setUsername("admin");
        user.setPassword(encoder.encode("123456"));
        user.setCreatedAt(LocalDateTime.now());
        user.setCreatedBy(0);
        userRepository.save(user);
        Assertions.assertThat(user.getId()).isNotNull();
    }

    @Test
    public void whenParsingJsonStringIntoJsonNode_thenCorrect() throws Exception {
        String jsonString = "{\"k1\":\"v1\",\"k2\":\"v2\"}";

        ObjectMapper mapper = new ObjectMapper();
        JsonNode actualObj = mapper.readTree(jsonString);

        System.out.print(actualObj);

        Assertions.assertThat(actualObj).isNotNull();
    }
}
