package com.react.service.impl;

import com.react.data.dto.rule.RuleDto;
import com.react.common.Utils.MappingUtils;
import com.react.data.model.Permission;
import com.react.data.model.Rule;
import com.react.data.repository.RuleRepository;
import com.react.service.RuleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class RuleServiceImpl implements RuleService {
    private final RuleRepository ruleRepository;
    private final MappingUtils mappingUtils;
    public RuleServiceImpl(RuleRepository ruleRepository, MappingUtils mappingUtils) {
        this.ruleRepository = ruleRepository;
        this.mappingUtils = mappingUtils;
    }

    @Override
    public Page<Rule> get(Pageable page) {
        return ruleRepository.findAll(page);
    }

    @Override
    public Rule get(Integer id) {
        Optional<Rule> optionalRule = ruleRepository.findByIdWithPermissions(id);
        if (optionalRule.isEmpty()) {
            throw new EntityNotFoundException("Rule not found");
        }
        return optionalRule.get();
    }

    @Override
    public Rule add(RuleDto ruleDto) {
        Rule rule = new Rule();
        rule.setName(ruleDto.getName());
        List<Permission> permissions = mappingUtils.mapList(ruleDto.getPermissions(),Permission.class);
        rule.setPermissions(permissions);
        return ruleRepository.save(rule);
    }

    @Override
    public Rule change(Integer id, RuleDto ruleDto) {
        Optional<Rule> optionalRule = ruleRepository.findById(id);
        if (optionalRule.isEmpty()) {
            throw new EntityNotFoundException("Rule not found");
        }
        Rule rule = optionalRule.get();
        rule.setName(ruleDto.getName());
        List<Permission> permissions = mappingUtils.mapList(ruleDto.getPermissions(),Permission.class);
        rule.setPermissions(permissions);
        return ruleRepository.save(rule);
    }

    @Override
    public void delete(Integer id) {
        Optional<Rule> optionalRule = ruleRepository.findById(id);
        if (optionalRule.isEmpty()) {
            throw new EntityNotFoundException("Rule not found");
        }
        ruleRepository.delete(optionalRule.get());
    }
}
