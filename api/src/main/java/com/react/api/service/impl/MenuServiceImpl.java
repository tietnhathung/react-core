package com.react.api.service.impl;

import com.react.api.dto.menu.MenuDto;
import com.react.api.model.Menu;
import com.react.api.model.Permission;
import com.react.api.repository.MenuRepository;
import com.react.api.repository.PermissionRepository;
import com.react.api.service.MenuService;
import com.react.api.types.Pagination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MenuServiceImpl implements MenuService {
    private final MenuRepository menuRepository;
    private final PermissionRepository permissionRepository;

    public MenuServiceImpl(MenuRepository menuRepository, PermissionRepository permissionRepository) {
        this.menuRepository = menuRepository;
        this.permissionRepository = permissionRepository;
    }

    @Override
    public Pagination<Menu> findAll(Integer page, Integer perPage) {
        Sort sort = Sort.by("id");
        if (0 < perPage) {
            PageRequest paging = PageRequest.of(page, perPage, sort);
            Page<Menu> menus = menuRepository.findAll(paging);
            return new Pagination<>(menus);
        }
        List<Menu> menus = menuRepository.findAll(sort);
        return new Pagination<>(menus);
    }

    @Override
    public Menu find(Integer id) {
        Optional<Menu> optionalMenu = menuRepository.findById(id);
        if (optionalMenu.isEmpty()) {
            throw new EntityNotFoundException("Menu not found");
        }
        return optionalMenu.get();
    }

    @Override
    public Menu create(MenuDto menuDto) {
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
        return menuRepository.save(menu);
    }

    @Override
    public Menu update(Integer id, MenuDto menuDto) {
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
        return menuRepository.save(menu);
    }

    @Override
    public void delete(Integer id) {
        Optional<Menu> optionalMenu = menuRepository.findById(id);
        if (optionalMenu.isEmpty()) {
            throw new EntityNotFoundException("Menu not found");
        }
        menuRepository.delete(optionalMenu.get());
    }

    public List<Menu> buildMenu(List<Menu> menuRow) {
        return new ArrayList<>(getChildrenOfMenu(menuRow, null));
    }

    public List<Menu> buildMenuByUser(Integer userId) {
        List<Menu> menuRow = new ArrayList<>(menuRepository.findAllByUserId(userId));
        return buildMenu(menuRow);
    }

    private List<Menu> getChildrenOfMenu(List<Menu> allMenus, Integer parentId) {
        List<Menu> menus = allMenus.stream().filter(menu -> Objects.equals(menu.getParentId(), parentId)).collect(Collectors.toList());
        allMenus.removeAll(menus);
        menus = menus.stream().peek(menu -> {
            menu.setChildren(getChildrenOfMenu(allMenus, menu.getId()));
        }).collect(Collectors.toList());
        return menus;
    }
}
