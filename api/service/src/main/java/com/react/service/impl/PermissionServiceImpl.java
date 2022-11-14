package com.react.service.impl;

import com.react.common.dto.permission.PermissionDto;
import com.react.common.types.Pagination;
import com.react.data.model.Permission;
import com.react.data.repository.PermissionRepository;
import com.react.service.PermissionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PermissionServiceImpl implements PermissionService {
    private final PermissionRepository permissionRepository;

    public PermissionServiceImpl(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    @Override
    public Pagination<Permission> get(Pageable page) {
        Page<Permission> users = permissionRepository.findAll(page);
        return new Pagination<>(users);
    }

    @Override
    public Permission get(Integer id) {
        return null;
    }

    @Override
    public Permission add(PermissionDto permissionDto) {
        return null;
    }

    @Override
    public Permission change(Integer id, PermissionDto permissionDto) {
        return null;
    }

    @Override
    public void delete(Integer id) {

    }
}
