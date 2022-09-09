package com.react.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EntityScan("com.react.data")
@EnableJpaRepositories("com.react.data")
@ComponentScan({"com.react.common","com.react.service", "com.react.api"})
public class ReactApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(ReactApiApplication.class, args);
    }
}
