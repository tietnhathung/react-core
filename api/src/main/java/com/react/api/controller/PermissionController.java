package com.react.api.controller;


import com.react.common.helpers.ResponseBuilder;
import com.react.data.model.Permission;
import com.react.service.PermissionService;
import com.react.common.types.ApiResult;
import com.react.common.types.Pagination;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<ApiResult> get(@RequestParam(required = false, defaultValue = "0") Integer page, @RequestParam(required = false, defaultValue = "0") Integer perPage) {
        logger.info("get page:{}, perPage:{}", page, perPage);
        Pagination<Permission> users = permissionService.findAll(page, perPage);
        return ResponseBuilder.page(users);
    }
}
