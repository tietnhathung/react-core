package com.react.api.repository;

import com.react.api.model.Menu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import javax.persistence.QueryHint;
import javax.validation.constraints.Size;
import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Integer>, JpaSpecificationExecutor<Menu> {

    @EntityGraph(attributePaths = {"parent"})
    @Query("select m from Menu as m")
    List<Menu> findAllAndParent();
}