package com.react.service.impl;

import com.react.data.dto.permission.PermissionDto;
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
    public Page<Permission> get(Pageable page) {
        return permissionRepository.findAll(page);
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
