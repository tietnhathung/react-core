import React from 'react';
import {Pagination} from "react-bootstrap";


interface IAppPaginationProps {
    totalItems: number,
    perPage: number,
    page: number,
    setPage: (page: number) => void,
}

const AppPagination = (props: IAppPaginationProps) => {
    let {perPage, page, totalItems,setPage} = props
    let totalPage: number = Math.ceil(totalItems / perPage);
    let numbersPage: number[] = [];
    for (let i = 0; i < totalPage; i++) {
        numbersPage.push(i)
    }
    return (
        totalPage > 1 ? <Pagination size="sm">
            {page > 1 && <Pagination.First onClick={()=>{setPage(0)}}/>}
            {page !== 0 && <Pagination.Prev onClick={()=>{setPage(page-1 <= 0 ? 0 : page-1 )}}/>}
            {page >= 3 && <Pagination.Item onClick={()=>{setPage(1)}}>{1}</Pagination.Item>}
            {page >= 4 && <Pagination.Ellipsis/>}
            {numbersPage.map((value, index) => {
                if (numbersPage.length <= 5 || (value >= page - 2 && value <= page + 2)) {
                    return <Pagination.Item active={value === page} key={value}  onClick={()=>{setPage(value)}} >{index + 1}</Pagination.Item>
                }else{
                    return <></>
                }
            })}
            {page + 4 < totalPage && <Pagination.Ellipsis/>}
            {page + 3 < totalPage && <Pagination.Item onClick={()=>{setPage(totalPage -1)}}>{totalPage}</Pagination.Item>}
            {page !== totalPage -1 && <Pagination.Next onClick={()=>{setPage(page+1 >= totalPage -1 ? totalPage -1 : page+1 )}}/>}
            {page < totalPage -2 && <Pagination.Last onClick={()=>{setPage(totalPage -1)}}/>}
        </Pagination> : <></>
    );
};

export default AppPagination;
