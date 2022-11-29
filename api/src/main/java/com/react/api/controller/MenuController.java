package com.react.api.controller;


import com.react.api.hepers.ResponseBuilder;
import com.react.data.dto.MenuDto;
import com.react.data.model.Menu;
import com.react.data.type.ApiError;
import com.react.data.type.ApiResult;
import com.react.service.MenuService;
import com.react.service.impl.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<ApiResult> get(Pageable page) {
        logger.info("get menus page:{}", page.toString());
        Page<Menu> menus = menuService.get(page);
        return ResponseBuilder.page(menus);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('MENU')")
    public ResponseEntity<ApiResult> getById(@PathVariable Integer id) {
        try {
            Menu menu = menuService.get(id);
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
            Menu savedMenu = menuService.add(menuDto);
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
            Menu savedMenu = menuService.change(id, menuDto);
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
