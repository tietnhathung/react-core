package com.react.data.mapper;

import com.react.data.dto.RuleDto;
import com.react.data.model.Rule;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Component;

@Component
public class RuleMapper extends DtoMapperImpl<Rule, RuleDto>{
    protected RuleMapper(ModelMapper modelMapper) {
        super(modelMapper);
        TypeMap<Rule, RuleDto> propertyMapper = modelMapper.createTypeMap(Rule.class, RuleDto.class);
        propertyMapper.addMappings(mapping -> mapping.skip(RuleDto::setPermissions));
        this.modelMapper = modelMapper;
    }
}
