package com.react.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.react.api.dto.use.UserCreateDto;
import com.react.api.model.Menu;
import com.react.api.model.User;
import com.react.api.repository.MenuRepository;
import com.react.api.repository.UserRepository;
import com.react.api.service.MenuService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.*;
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
        Assertions.assertThat(menuRepository).isNotNull();
    }

    @Test
    void whenParsingJsonStringIntoJsonNode_thenCorrect() throws Exception {
        String jsonString = "{\"k1\":\"v1\",\"k2\":\"v2\"}";

        ObjectMapper mapper = new ObjectMapper();
        JsonNode actualObj = mapper.readTree(jsonString);

        Assertions.assertThat(actualObj).isNotNull();
    }

    @Test
    void testCache() {
        Optional<User> optUser = userRepository.findByUsername("anh9ok");
        Assertions.assertThat(optUser.isPresent()).isTrue();
    }

    @Test
    void menuServiceServiceTest() {
        List<Menu> menus = menuService.buildMenuByUser(1);

        Assertions.assertThat(menus.isEmpty()).isFalse();
        Assertions.assertThat((long) menus.size()).isNotZero();
    }

    @Test
    void givenAbstractClass_whenDeserializing_thenException() throws IOException {
        String json = "{\"username\":\"anh1ok\",\"fullName\":\"fullName\",\"password\":\"password\"}";
        ObjectMapper mapper = new ObjectMapper();
        UserCreateDto userCreateDto = mapper.reader().forType(UserCreateDto.class).readValue(json);
        Assertions.assertThat(userCreateDto).isNotNull();
    }

}
