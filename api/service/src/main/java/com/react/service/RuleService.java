package com.react.service;

import com.react.common.dto.rule.RuleDto;
import com.react.data.model.Rule;
import com.react.common.types.Pagination;

public interface RuleService {
    Pagination<Rule> findAll(Integer page, Integer perPage);
    Rule find(Integer id);
    Rule create(RuleDto ruleDto);
    Rule update(Integer id, RuleDto ruleDto);
    void delete(Integer id);
}
