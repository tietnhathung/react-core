package com.react.api.service;

import com.react.api.dto.permission.PermissionDto;
import com.react.api.model.Permission;
import com.react.api.types.Pagination;

public interface PermissionService {
    Pagination<Permission> findAll(Integer page, Integer perPage);
    Permission find(Integer id);
    Permission create(PermissionDto permissionDto);
    Permission update(Integer id, PermissionDto permissionDto);
    void delete(Integer id);
}
