import React, {useEffect, useState} from "react";
import {TApiErrors} from "../../../types/TApiErrors";
import AppConstants from "../../../constants/appConstants";
import {Button, Card, Col, Row, Table} from "react-bootstrap";
import AlertErrors from "../../../components/AlertErrors";
import {Link} from "react-router-dom";
import FaIcon from "../../../components/FaIcon";
import AppPagination from "../../../components/AppPagination";
import {IMenu} from "../../../types/entities/IMenu";
import {deleteMenu, getMenus} from "../../../services/menuServices";
import alertify from "../../../instants/alertify";

const useIndex = function () {
    let [menus, setMenus] = useState<IMenu[]>([]);
    let [totalItems, setTotalItems] = useState<number>(0);
    let [page, setPage] = useState<number>(0);
    let [errorsMessages, setErrorsMessages] = useState<TApiErrors>();

    useEffect(function () {
        fetchItems(page).then();
    }, [page])

    const fetchItems = async (page:number): Promise<void> => {
        let {status, data , error} = await getMenus(page, AppConstants.pagination);
        if (status && data) {
            setMenus(data.content)
            setTotalItems(data.totalElements)
        }
        if (!status && error){
            setErrorsMessages(error)
        }
    }

    const removeItem = (id: number): void => {
        alertify.confirm("You won't be able to revert this.", async function () {
            let {status} = await deleteMenu(id);
            if (status) {
                await fetchItems(page);
                alertify.success(`Delete item with id is ${id} successfully`);
            } else {
                alertify.error(`Delete item has id: ${id} failed`);
            }
        });
    }

    return {
        state: {
            menus,
            page,
            totalItems,
            errorsMessages
        },
        method: {
            setPage,
            removeItem
        }
    }
}

const Index: React.FC = () => {
    const {state, method} = useIndex();
    return (
        <Row>
            <Col md={12}>
                {state.errorsMessages && <AlertErrors error={state.errorsMessages}/>}
            </Col>
            <Col md={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>
                            User <Link className="btn btn-sm btn-primary" to="/menu/create">
                                <i className="fas fa-plus"></i> Add
                            </Link>
                        </Card.Title>

                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-center">
                                <th>Id</th>
                                <th>Title</th>
                                <th>Url</th>
                                <th>Target</th>
                                <th className="w-300-px">Function</th>
                            </tr>
                            </thead>
                            <tbody>
                            {state.menus.map(menu => (
                                <tr key={menu.id}>
                                    <td>{menu.id}</td>
                                    <td>{menu.title}</td>
                                    <td>{menu.url}</td>
                                    <td>{menu.target}</td>
                                    <td className="text-center">
                                        <Link className="me-2 text-white btn btn-primary btn-sm"
                                              to={`/menu/show/${menu.id}`}>
                                            <FaIcon icon="far fa-search"/> Show
                                        </Link>
                                        <Link className="me-2 text-white btn btn-success btn-sm"
                                              to={`/menu/edit/${menu.id}`}>
                                            <FaIcon icon="far fa-pen"/> Edit
                                        </Link>
                                        <Button className="me-2 text-white" variant="danger" size="sm" onClick={() => {
                                            method.removeItem(menu.id)
                                        }}>
                                            <FaIcon icon="far fa-trash-alt"/> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {state.menus.length === 0 && <tr>
                                <td className="text-center" colSpan={5}>No data!</td>
                            </tr>}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <AppPagination page={state.page} totalItems={state.totalItems} perPage={AppConstants.pagination}
                                       setPage={method.setPage}/>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    );
};
export default Index;
