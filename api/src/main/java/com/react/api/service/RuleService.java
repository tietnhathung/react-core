package com.react.api.service;

import com.react.api.dto.rule.RuleDto;
import com.react.api.model.Rule;
import com.react.api.types.Pagination;

public interface RuleService {
    Pagination<Rule> findAll(Integer page, Integer perPage);
    Rule find(Integer id);
    Rule create(RuleDto ruleDto);
    Rule update(Integer id, RuleDto ruleDto);
    void delete(Integer id);
}
