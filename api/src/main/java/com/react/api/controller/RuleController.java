package com.react.api.controller;

import com.react.api.hepers.ResponseBuilder;
import com.react.data.dto.rule.RuleDto;
import com.react.data.model.Rule;
import com.react.data.types.ApiError;
import com.react.data.types.ApiResult;
import com.react.service.RuleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/rule")
@PreAuthorize("hasAnyAuthority('RULE')")
public class RuleController {
    private final Logger logger = LoggerFactory.getLogger(MenuController.class);
    private final RuleService ruleService;

    public RuleController(RuleService ruleService) {
        this.ruleService = ruleService;
    }

    @GetMapping
    public ResponseEntity<ApiResult> get(Pageable page) {
        logger.info("get rules page:{}", page.toString());
        Page<Rule> rules = ruleService.get(page);
        return ResponseBuilder.page(rules);
    }

    @GetMapping("{id}")
    public ResponseEntity<ApiResult> find(@PathVariable Integer id) {
        logger.info("find id:{}", id);
        try {
            Rule rule = ruleService.get(id);
            return ResponseBuilder.ok(rule, HttpStatus.OK);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResult> create(@Valid @RequestBody RuleDto ruleDto) {
        logger.info("create RuleDto:{}", ruleDto);
        try {
            Rule savedRule = ruleService.add(ruleDto);
            return ResponseBuilder.ok(savedRule, HttpStatus.CREATED);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<ApiResult> update(@PathVariable Integer id, @Valid @RequestBody RuleDto ruleDto) {
        logger.info("update RuleDto:{}", ruleDto);
        try {
            Rule savedRule = ruleService.change(id, ruleDto);
            return ResponseBuilder.ok(savedRule, HttpStatus.OK);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResult> delete(@PathVariable Integer id) {
        logger.info("delete rule id:{}", id);
        try {
            ruleService.delete(id);
            return ResponseBuilder.ok();
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }
}

