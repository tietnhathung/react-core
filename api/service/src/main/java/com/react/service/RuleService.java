package com.react.service;

import com.react.data.dto.rule.RuleDto;
import com.react.data.model.Rule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RuleService {
    Page<Rule> get(Pageable page);
    Rule get(Integer id);
    Rule add(RuleDto ruleDto);
    Rule change(Integer id, RuleDto ruleDto);
    void delete(Integer id);

}
