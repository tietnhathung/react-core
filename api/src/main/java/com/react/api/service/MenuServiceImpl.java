package com.react.api.service;

import com.react.api.model.Menu;
import com.react.api.repository.MenuRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class MenuServiceImpl implements MenuService {
    private MenuRepository menuRepository;

    public MenuServiceImpl(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public List<Menu> buildMenu() {
        List<Menu> menuRow = menuRepository.findAllAndParent();
        return new ArrayList<>(getChildrenOfMenu(menuRow, null));
    }

    private List<Menu> getChildrenOfMenu(List<Menu> allMenus, Integer parentId) {

        List<Menu> menus = allMenus.stream().filter(menu -> {
            return Objects.equals(menu.getParent(), parentId) || Objects.equals(menu.getParent().getId(), parentId);
        }).collect(Collectors.toList());
        allMenus.removeAll(menus);
        menus = menus.stream().peek(menu -> {
            menu.setChildren(getChildrenOfMenu(allMenus, menu.getId()));
        }).collect(Collectors.toList());
        return menus;
    }
}