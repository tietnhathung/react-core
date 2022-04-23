import React from 'react';
import {Pagination} from "react-bootstrap";


interface IAppPaginationProps {
    totalItem: number,
    perPage: number,
    currentPage: number,
}

const AppPagination = (props: IAppPaginationProps) => {
    let {perPage, currentPage, totalItem} = props
    let totalPage: number = Math.ceil(totalItem / perPage);

    function build() {

    }

    return (
        <Pagination size="sm">
            <Pagination.First/>
            <Pagination.Prev/>

            {Array(totalPage).map((value: null, index) => (
                <Pagination.Item>{index + 1}</Pagination.Item>
            ))}
            {build()}

            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Next/>
            <Pagination.Last/>
        </Pagination>
    );
};

export default AppPagination;
