package com.react.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/test")
public class Test {

    @GetMapping("test1")
    public String test1(){
        return "Tes";
    }
    @GetMapping("test2")
    public String test2(){
        return "Tes2";
    }
}
