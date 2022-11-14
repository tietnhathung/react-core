package com.react.service;

import com.react.common.dto.rule.RuleDto;
import com.react.data.model.Rule;
import com.react.common.types.Pagination;
import org.springframework.data.domain.Pageable;

public interface RuleService {
    Pagination<Rule> get(Pageable page);
    Rule get(Integer id);
    Rule add(RuleDto ruleDto);
    Rule change(Integer id, RuleDto ruleDto);
    void delete(Integer id);

}
