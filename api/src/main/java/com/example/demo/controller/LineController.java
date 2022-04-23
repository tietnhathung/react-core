package com.example.demo.controller;

import com.example.demo.common.ResponseBuilder;
import com.example.demo.model.Account;
import com.example.demo.model.Line;
import com.example.demo.repository.LineRepository;
import com.example.demo.types.ApiData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/line")
public class LineController {
    private final LineRepository lineRepository;

    public LineController(LineRepository lineRepository) {
        this.lineRepository = lineRepository;
    }

    @GetMapping
    public ResponseEntity<ApiData> get(){
        List<Line> account = lineRepository.findAll();
        return ResponseBuilder.ok(account);
    }
}
