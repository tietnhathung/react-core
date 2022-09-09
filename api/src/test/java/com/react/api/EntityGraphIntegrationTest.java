package com.react.api;

import com.react.data.model.Menu;
import com.react.data.repository.MenuRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class EntityGraphIntegrationTest {
    @Autowired
    private MenuRepository menuRepository;

    @Test
    void injectedComponentsAreNotNull() {
        Menu menu = menuRepository.findById(2).orElseThrow();
        Assertions.assertThat(menu).isNotNull();
    }
}
