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
    private final MenuRepository menuRepository;

    public MenuServiceImpl(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public List<Menu> buildMenu() {
        List<Menu> menuRow = menuRepository.findAll();
        return new ArrayList<>(getChildrenOfMenu(menuRow, null));
    }

    @Override
    public List<Menu> buildMenuByUser(Integer userId) {
        List<Menu> menuRow = new ArrayList<>(menuRepository.findAllByUserId(userId));
        return new ArrayList<>(getChildrenOfMenu(menuRow, null));
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
