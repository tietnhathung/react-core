package com.react.service.impl;

import com.react.common.dto.permission.PermissionDto;
import com.react.data.model.Permission;
import com.react.data.repository.PermissionRepository;
import com.react.service.PermissionService;
import com.react.common.types.Pagination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionServiceImpl implements PermissionService {
    private final PermissionRepository permissionRepository;

    public PermissionServiceImpl(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    @Override
    public Pagination<Permission> findAll(Integer page, Integer perPage) {
        Sort sort = Sort.by("id");
        if (0 < perPage) {
            PageRequest paging = PageRequest.of(page, perPage, sort);
            Page<Permission> users = permissionRepository.findAll(paging);
            return new Pagination<>(users);
        }
        List<Permission> users = permissionRepository.findAll(sort);
        return new Pagination<>(users);
    }

    @Override
    public Permission find(Integer id) {
        return null;
    }

    @Override
    public Permission create(PermissionDto permissionDto) {
        return null;
    }

    @Override
    public Permission update(Integer id, PermissionDto permissionDto) {
        return null;
    }

    @Override
    public void delete(Integer id) {

    }
}
