package com.react.service;

import com.react.data.dto.MenuDto;
import com.react.data.model.Menu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MenuService {
    Page<Menu> get(Pageable page);

    Menu get(Integer id);

    Menu add(MenuDto menuDto);

    Menu change(Integer id, MenuDto menuDto);

    void delete(Integer id);

    List<Menu> buildMenu(List<Menu> menuRow);

    List<Menu> buildMenuByUser(Integer userId);
}
