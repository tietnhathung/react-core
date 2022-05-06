package com.react.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.react.api.dto.auth.JwtDto;
import com.react.api.model.Menu;
import com.react.api.model.User;
import com.react.api.repository.MenuRepository;
import com.react.api.repository.UserRepository;
import com.react.api.service.MenuService;
import com.react.api.service.UserDetailsImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
class DemoApplicationTests {
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MenuService menuService;

    @Autowired
    private MenuRepository menuRepository;

    @Test
    void contextLoads() {
    }

//    @Test
//    void createUser() {
//        User user = new User();
//        user.setFullName("Tiết Nhật Hưng");
//        user.setStatus(true);
//        user.setUsername("admin");
//        user.setPassword(encoder.encode("123456"));
//        user.setCreatedAt(LocalDateTime.now());
//        user.setCreatedBy(0);
//        userRepository.save(user);
//        Assertions.assertThat(user.getId()).isNotNull();
//    }

    @Test
    public void whenParsingJsonStringIntoJsonNode_thenCorrect() throws Exception {
        String jsonString = "{\"k1\":\"v1\",\"k2\":\"v2\"}";

        ObjectMapper mapper = new ObjectMapper();
        JsonNode actualObj = mapper.readTree(jsonString);

        System.out.print(actualObj);

        Assertions.assertThat(actualObj).isNotNull();
    }

    @Test
    public void testCache() {
        Optional<User> optUser = userRepository.findByUsername("admin");
        Optional<User> optUser2 = userRepository.findByUsername("admin");
        Optional<User> optUser3 = userRepository.findByUsername("admin2");

        Assertions.assertThat(optUser.isPresent()).isTrue();
        Assertions.assertThat(optUser2.isPresent()).isTrue();
        Assertions.assertThat(optUser3.isEmpty()).isTrue();
    }

    @Test
    public void menuServiceServiceTest() throws IOException {
        List<Menu> menus = menuService.buildMenu();

        Assertions.assertThat(menus.isEmpty()).isFalse();
    }
}
