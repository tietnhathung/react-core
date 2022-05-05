package com.react.api;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.react.api.model.User;
import com.react.api.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.time.LocalDateTime;
import static org.assertj.core.api.Assertions.assertThat;

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
	void createUser(){
		User user = new User();
		user.setFullName("Tiết Nhật Hưng");
		user.setStatus(true);
		user.setUsername("admin");
		user.setPassword( encoder.encode("123456") );
		user.setCreatedAt(LocalDateTime.now());
		user.setCreatedBy(0);
		userRepository.save(user);
		assertThat(user.getId()).isNotNull();
	}

	@Test
	public void whenParsingJsonStringIntoJsonNode_thenCorrect() throws IOException {
		String jsonString = "{\"k1\":\"v1\",\"k2\":\"v2\"}";

		ObjectMapper mapper = new ObjectMapper();
		JsonNode actualObj = mapper.readTree(jsonString);

		System.out.print(actualObj);

		assertThat(actualObj).isNotNull();
	}
}
