package com.react.api.controller;


import com.react.common.helpers.ResponseBuilder;
import com.react.common.types.ApiResult;
import com.react.common.types.Pagination;
import com.react.data.model.Permission;
import com.react.service.PermissionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/permission")
public class PermissionController {
    private final Logger logger = LoggerFactory.getLogger(PermissionController.class);

    private final PermissionService permissionService;

    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping
    public ResponseEntity<ApiResult> get(Pageable page) {
        logger.info("get permission page:{}", page.toString());
        Pagination<Permission> users = permissionService.get(page);
        return ResponseBuilder.page(users);
    }
}
