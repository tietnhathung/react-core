package com.react.api.controller;


import com.react.api.common.ResponseBuilder;
import com.react.api.model.Menu;
import com.react.api.repository.MenuRepository;
import com.react.api.service.MenuService;
import com.react.api.service.UserDetailsImpl;
import com.react.api.types.ApiData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/menu")
@PreAuthorize("hasAnyAuthority('MENU')")
public class MenuController {
    private final Logger logger = LoggerFactory.getLogger(MenuController.class);
    private final MenuRepository menuRepository;
    private final MenuService menuService;

    public MenuController(MenuRepository menuRepository, MenuService menuService) {
        this.menuRepository = menuRepository;
        this.menuService = menuService;
    }

    @GetMapping
    public ResponseEntity<ApiData> get(@RequestParam(required = false, defaultValue = "0") int page, @RequestParam(required = false, defaultValue = "0") int perPage) {
        logger.info("get menus page:{}, perPage:{}", page, perPage);

        Sort sort = Sort.by("id");
        PageRequest paging = PageRequest.of(page, 0 < perPage ? perPage : Integer.MAX_VALUE, sort);
        Page<Menu> menus = menuRepository.findAll(paging);
        return ResponseBuilder.page(menus);
    }

    @GetMapping("user")
    public ResponseEntity<ApiData> getByUser(Authentication authentication){
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<Menu> menus = menuService.buildMenuByUser(userDetails.getId());
        return ResponseBuilder.ok(menus);
    }
}
