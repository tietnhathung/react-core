package com.react.api;

import com.react.api.model.Menu;
import com.react.api.repository.MenuRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class EntityGraphIntegrationTest {
    @Autowired
    private MenuRepository menuRepository;

    @Test
    void injectedComponentsAreNotNull()throws Exception{
        Menu menu = menuRepository.findById(2).orElseThrow();

        Assertions.assertThat(menu).isNotNull();
    }
}
