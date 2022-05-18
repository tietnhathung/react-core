package com.react.api.controller;

import com.react.api.common.ResponseBuilder;
import com.react.api.dto.rule.RuleDto;
import com.react.api.model.Rule;
import com.react.api.repository.RuleRepository;
import com.react.api.types.ApiResult;
import com.react.api.types.ApiError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/rule")
public class RuleController {
    private final Logger logger = LoggerFactory.getLogger(MenuController.class);
    private final RuleRepository ruleRepository;

    public RuleController(RuleRepository ruleRepository) {
        this.ruleRepository = ruleRepository;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('RULE')")
    public ResponseEntity<ApiResult> get(@RequestParam(required = false, defaultValue = "0") Integer page, @RequestParam(required = false, defaultValue = "0") Integer perPage) {
        logger.info("get rules page:{}, perPage:{}", page, perPage);
        Sort sort = Sort.by("name");
        if (0 < perPage) {
            PageRequest paging = PageRequest.of(page, perPage, sort);
            Page<Rule> rules = ruleRepository.findAll(paging);
            return ResponseBuilder.page(rules);
        }
        List<Rule> rules = ruleRepository.findAll(sort);
        return ResponseBuilder.page(rules);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('RULE')")
    public ResponseEntity<ApiResult> find(@PathVariable Integer id) {
        logger.info("find id:{}", id);
        try {
            Optional<Rule> optionalRule = ruleRepository.findByIdWithPermissions(id);
            if (optionalRule.isEmpty()) {
                throw new EntityNotFoundException("Rule not found");
            }
            return ResponseBuilder.ok(optionalRule.get(), HttpStatus.OK);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('RULE')")
    public ResponseEntity<ApiResult> create(@Valid @RequestBody RuleDto ruleDto) {
        logger.info("create RuleDto:{}", ruleDto);
        try {
            Rule rule = new Rule();
            rule.setName(ruleDto.getName());
            rule.setPermissions(ruleDto.getPermissions());
            Rule savedRule = ruleRepository.save(rule);
            return ResponseBuilder.ok(savedRule, HttpStatus.CREATED);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @PutMapping("{id}")
    @PreAuthorize("hasAnyAuthority('RULE')")
    public ResponseEntity<ApiResult> update(@PathVariable Integer id, @Valid @RequestBody RuleDto ruleDto) {
        logger.info("update RuleDto:{}", ruleDto);
        try {
            Optional<Rule> optionalRule = ruleRepository.findById(id);
            if (optionalRule.isEmpty()) {
                throw new EntityNotFoundException("Rule not found");
            }
            Rule rule = optionalRule.get();
            rule.setName(ruleDto.getName());
            rule.setPermissions(ruleDto.getPermissions());
            Rule savedRule = ruleRepository.save(rule);
            return ResponseBuilder.ok(savedRule, HttpStatus.OK);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAnyAuthority('RULE')")
    public ResponseEntity<ApiResult> delete(@PathVariable Integer id) {
        logger.info("delete rule id:{}", id);
        try {
            Optional<Rule> optionalRule = ruleRepository.findById(id);
            if (optionalRule.isEmpty()) {
                throw new EntityNotFoundException("Rule not found");
            }
            ruleRepository.delete(optionalRule.get());
            return ResponseBuilder.ok();
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }
}
