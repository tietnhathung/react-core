package com.react.service;

import com.react.common.dto.menu.MenuDto;
import com.react.data.model.Menu;
import com.react.common.types.Pagination;

import java.util.List;

public interface MenuService {
    Pagination<Menu> findAll(Integer page, Integer perPage);

    Menu find(Integer id);

    Menu create(MenuDto menuDto);

    Menu update(Integer id, MenuDto menuDto);

    void delete(Integer id);

    List<Menu> buildMenu(List<Menu> menuRow);

    List<Menu> buildMenuByUser(Integer userId);
}
