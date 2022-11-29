package com.react.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@EnableScheduling
@SpringBootApplication
@EntityScan("com.react.data")
@EnableJpaRepositories("com.react.data")
@ComponentScan({"com.react.common","com.react.data.mapper","com.react.service", "com.react.api"})
public class ReactApiApplication {
    private final SimpMessageSendingOperations messagingTemplate;

    public ReactApiApplication(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public static void main(String[] args) {
        SpringApplication.run(ReactApiApplication.class, args);
    }

    @Scheduled(fixedDelay = 10000)
    public void scheduleFixedDelayTask() {
        messagingTemplate.convertAndSend("/topic/server-time",System.currentTimeMillis());
    }
}
