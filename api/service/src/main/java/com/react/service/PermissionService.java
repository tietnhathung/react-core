package com.react.service;

import com.react.common.dto.permission.PermissionDto;
import com.react.data.model.Permission;
import com.react.common.types.Pagination;
import org.springframework.data.domain.Pageable;

public interface PermissionService {
    Pagination<Permission> get(Pageable page);
    Permission get(Integer id);
    Permission add(PermissionDto permissionDto);
    Permission change(Integer id, PermissionDto permissionDto);
    void delete(Integer id);
}
