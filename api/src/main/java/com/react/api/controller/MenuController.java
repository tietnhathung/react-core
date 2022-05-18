package com.react.api.controller;


import com.react.api.common.ResponseBuilder;
import com.react.api.dto.menu.MenuDto;
import com.react.api.model.Menu;
import com.react.api.model.Permission;
import com.react.api.repository.MenuRepository;
import com.react.api.repository.PermissionRepository;
import com.react.api.service.MenuService;
import com.react.api.service.UserDetailsImpl;
import com.react.api.types.ApiResult;
import com.react.api.types.ApiError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/menu")
public class MenuController {
    private final Logger logger = LoggerFactory.getLogger(MenuController.class);
    private final MenuRepository menuRepository;
    private final PermissionRepository permissionRepository;
    private final MenuService menuService;

    public MenuController(MenuRepository menuRepository, PermissionRepository permissionRepository, MenuService menuService) {
        this.menuRepository = menuRepository;
        this.permissionRepository = permissionRepository;
        this.menuService = menuService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('MENU')")
    public ResponseEntity<ApiResult> get(@RequestParam(required = false, defaultValue = "0") Integer page, @RequestParam(required = false, defaultValue = "0") Integer perPage) {
        logger.info("get menus page:{}, perPage:{}", page, perPage);
        Sort sort = Sort.by("id");
        if (0 < perPage) {
            PageRequest paging = PageRequest.of(page, perPage, sort);
            Page<Menu> menus = menuRepository.findAll(paging);
            return ResponseBuilder.page(menus);
        }
        List<Menu> menus = menuRepository.findAll(sort);
        return ResponseBuilder.page(menus);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('MENU')")
    public ResponseEntity<ApiResult> getById(@PathVariable Integer id) {
        try {
            Optional<Menu> optionalMenu = menuRepository.findById(id);
            if (optionalMenu.isEmpty()) {
                throw new EntityNotFoundException("Menu not found");
            }
            return ResponseBuilder.ok(optionalMenu.get());
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('MENU')")
    public ResponseEntity<ApiResult> create(@Valid @RequestBody MenuDto menuDto) {
        logger.info("create MenuDto:{}", menuDto);
        try {
            Menu menu = new Menu();
            menu.setTitle(menuDto.getTitle());
            menu.setUrl(menuDto.getUrl());
            menu.setIcon(menuDto.getIcon());
            menu.setParentId(menuDto.getParentId());
            menu.setTarget(menuDto.getTarget());
            if (menuDto.getPermission() != null) {
                Optional<Permission> OptionPermission = permissionRepository.findById(menuDto.getPermission().getId());
                if (OptionPermission.isEmpty()) {
                    throw new EntityNotFoundException("Permission not found");
                }
                menu.setPermission(OptionPermission.get());
            }
            Menu savedMenu = menuRepository.save(menu);
            return ResponseBuilder.ok(savedMenu, HttpStatus.CREATED);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @PutMapping("{id}")
    @PreAuthorize("hasAnyAuthority('MENU')")
    public ResponseEntity<ApiResult> update(@PathVariable Integer id, @Valid @RequestBody MenuDto menuDto) {
        logger.info("update MenuDto id:{}, data:{}", id, menuDto);
        try {
            Optional<Menu> optionalMenu = menuRepository.findById(id);
            if (optionalMenu.isEmpty()) {
                throw new EntityNotFoundException("Menu not found");
            }
            Menu menu = optionalMenu.get();
            menu.setTitle(menuDto.getTitle());
            menu.setUrl(menuDto.getUrl());
            menu.setIcon(menuDto.getIcon());
            menu.setParentId(menuDto.getParentId());
            menu.setTarget(menuDto.getTarget());
            if (menuDto.getPermission() != null) {
                Optional<Permission> OptionPermission = permissionRepository.findById(menuDto.getPermission().getId());
                if (OptionPermission.isEmpty()) {
                    throw new EntityNotFoundException("Permission not found");
                }
                menu.setPermission(OptionPermission.get());
            } else {
                menu.setPermission(null);
            }
            Menu savedMenu = menuRepository.save(menu);
            return ResponseBuilder.ok(savedMenu, HttpStatus.OK);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAnyAuthority('MENU')")
    public ResponseEntity<ApiResult> delete(@PathVariable Integer id) {
        logger.info("delete menu id:{}", id);
        try {
            Optional<Menu> optionalMenu = menuRepository.findById(id);
            if (optionalMenu.isEmpty()) {
                throw new EntityNotFoundException("Menu not found");
            }
            menuRepository.delete(optionalMenu.get());
            return ResponseBuilder.ok();
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @GetMapping("user")
    public ResponseEntity<ApiResult> getByUser(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<Menu> menus = menuService.buildMenuByUser(userDetails.getId());

        return ResponseBuilder.ok(menus);
    }
}
