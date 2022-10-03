package com.react.api.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;

@Controller
public class SocketTestController {
    @MessageMapping("/message")
    public void test3(String message, Authentication authentication) {
        UserDetails userDetail = (UserDetails)authentication.getPrincipal();
        System.out.println("message: "+message+", principal: "+userDetail.getUsername());
    }
}
