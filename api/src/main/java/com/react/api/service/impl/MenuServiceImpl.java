package com.react.api.service.impl;

import com.react.api.model.Menu;
import com.react.api.repository.MenuRepository;
import com.react.api.service.MenuService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class MenuServiceImpl implements MenuService {
    private final MenuRepository menuRepository;

    public MenuServiceImpl(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
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
