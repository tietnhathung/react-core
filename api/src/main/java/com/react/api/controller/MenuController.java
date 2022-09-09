package com.react.api.controller;


import com.react.common.helpers.ResponseBuilder;
import com.react.common.dto.menu.MenuDto;
import com.react.data.model.Menu;
import com.react.service.MenuService;
import com.react.service.impl.UserDetailsImpl;
import com.react.common.types.ApiResult;
import com.react.common.types.ApiError;
import com.react.common.types.Pagination;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("api/menu")
public class MenuController {
    private final Logger logger = LoggerFactory.getLogger(MenuController.class);
    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('MENU')")
    public ResponseEntity<ApiResult> get(@RequestParam(required = false, defaultValue = "0") Integer page, @RequestParam(required = false, defaultValue = "0") Integer perPage) {
        logger.info("get menus page:{}, perPage:{}", page, perPage);
        Pagination<Menu> menus = menuService.findAll(page, perPage);
        return ResponseBuilder.page(menus);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('MENU')")
    public ResponseEntity<ApiResult> getById(@PathVariable Integer id) {
        try {
            Menu menu = menuService.find(id);
            return ResponseBuilder.ok(menu);
        } catch (Exception errors) {
            return ResponseBuilder.found(new ApiError(errors));
        }
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('MENU')")
    public ResponseEntity<ApiResult> create(@Valid @RequestBody MenuDto menuDto) {
        logger.info("create MenuDto:{}", menuDto);
        try {
            Menu savedMenu = menuService.create(menuDto);
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
            Menu savedMenu = menuService.update(id, menuDto);
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
            menuService.delete(id);
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
