package com.react.api.service;

import com.react.api.model.Menu;

import java.util.List;

public interface MenuService {
    List<Menu> buildMenu();

    List<Menu> buildMenuByUser(Integer userId);
}
