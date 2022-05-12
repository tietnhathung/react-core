package com.react.api.controller;


import com.react.api.common.ResponseBuilder;
import com.react.api.model.Permission;
import com.react.api.model.User;
import com.react.api.repository.PermissionRepository;
import com.react.api.types.ApiData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/permission")
public class PermissionController {
    private final Logger logger = LoggerFactory.getLogger(PermissionController.class);
    private final PermissionRepository permissionRepository;

    public PermissionController(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    @GetMapping
    public ResponseEntity<ApiData> get(@RequestParam(required = false, defaultValue = "0") Integer page, @RequestParam(required = false, defaultValue = "0") Integer perPage) {
        logger.info("get page:{}, perPage:{}", page, perPage);
        Sort sort = Sort.by("id");
        if (0 < perPage){
            PageRequest paging = PageRequest.of(page, perPage, sort);
            Page<Permission> users = permissionRepository.findAll(paging);
            return ResponseBuilder.page(users);
        }
        List<Permission> users = permissionRepository.findAll(sort);
        return ResponseBuilder.page(users);
    }
}
