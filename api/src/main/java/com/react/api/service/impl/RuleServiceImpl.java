package com.react.api.service.impl;

import com.react.api.common.MappingUtils;
import com.react.api.dto.rule.RuleDto;
import com.react.api.model.Permission;
import com.react.api.model.Rule;
import com.react.api.repository.RuleRepository;
import com.react.api.service.RuleService;
import com.react.api.types.Pagination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    public Pagination<Rule> findAll(Integer page, Integer perPage) {
        Sort sort = Sort.by("name");
        if (0 < perPage) {
            PageRequest paging = PageRequest.of(page, perPage, sort);
            Page<Rule> rules = ruleRepository.findAll(paging);
            return new Pagination<>(rules);
        }
        List<Rule> rules = ruleRepository.findAll(sort);
        return new Pagination<>(rules);
    }

    @Override
    public Rule find(Integer id) {
        Optional<Rule> optionalRule = ruleRepository.findByIdWithPermissions(id);
        if (optionalRule.isEmpty()) {
            throw new EntityNotFoundException("Rule not found");
        }
        return optionalRule.get();
    }

    @Override
    public Rule create(RuleDto ruleDto) {
        Rule rule = new Rule();
        rule.setName(ruleDto.getName());
        List<Permission> permissions = mappingUtils.mapList(ruleDto.getPermissions(),Permission.class);
        rule.setPermissions(permissions);
        return ruleRepository.save(rule);
    }

    @Override
    public Rule update(Integer id, RuleDto ruleDto) {
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
