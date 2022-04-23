package com.react.api.controller;

import com.react.api.common.ResponseBuilder;
import com.react.api.model.Line;
import com.react.api.repository.LineRepository;
import com.react.api.types.ApiData;
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
