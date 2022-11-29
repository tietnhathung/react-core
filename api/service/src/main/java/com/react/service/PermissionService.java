package com.react.service;

import com.react.data.dto.PermissionDto;
import com.react.data.model.Permission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PermissionService {
    Page<Permission> get(Pageable page);
    Permission get(Integer id);
    Permission add(PermissionDto permissionDto);
    Permission change(Integer id, PermissionDto permissionDto);
    void delete(Integer id);
}
