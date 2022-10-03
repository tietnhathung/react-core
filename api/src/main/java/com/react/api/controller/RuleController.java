package com.react.api.controller;

import com.react.common.helpers.ResponseBuilder;
import com.react.common.dto.rule.RuleDto;
import com.react.data.model.Rule;
import com.react.service.RuleService;
import com.react.common.types.ApiResult;
import com.react.common.types.ApiError;
import com.react.common.types.Pagination;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    public ResponseEntity<ApiResult> get(@RequestParam(required = false, defaultValue = "0") Integer page, @RequestParam(required = false, defaultValue = "0") Integer perPage) {
        logger.info("get rules page:{}, perPage:{}", page, perPage);
        Pagination<Rule> rules = ruleService.findAll(page, perPage);
        return ResponseBuilder.page(rules);
    }

    @GetMapping("{id}")
    public ResponseEntity<ApiResult> find(@PathVariable Integer id) {
        logger.info("find id:{}", id);
        try {
            Rule rule = ruleService.find(id);
            return ResponseBuilder.ok(rule, HttpStatus.OK);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResult> create(@Valid @RequestBody RuleDto ruleDto) {
        logger.info("create RuleDto:{}", ruleDto);
        try {
            Rule savedRule = ruleService.create(ruleDto);
            return ResponseBuilder.ok(savedRule, HttpStatus.CREATED);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<ApiResult> update(@PathVariable Integer id, @Valid @RequestBody RuleDto ruleDto) {
        logger.info("update RuleDto:{}", ruleDto);
        try {
            Rule savedRule = ruleService.update(id, ruleDto);
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

