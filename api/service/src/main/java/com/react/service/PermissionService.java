package com.react.service;

import com.react.common.dto.permission.PermissionDto;
import com.react.data.model.Permission;
import com.react.common.types.Pagination;

public interface PermissionService {
    Pagination<Permission> findAll(Integer page, Integer perPage);
    Permission find(Integer id);
    Permission create(PermissionDto permissionDto);
    Permission update(Integer id, PermissionDto permissionDto);
    void delete(Integer id);
}
