package com.react.api.service;

import com.react.api.dto.menu.MenuDto;
import com.react.api.dto.rule.RuleDto;
import com.react.api.model.Menu;
import com.react.api.model.Rule;
import com.react.api.types.Pagination;

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
