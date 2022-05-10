import React, {useEffect, useState} from 'react';
import {deleteUser, getUsers} from "../../services/userServices";
import {IUser} from "../../types/entities/IUser";
import {Button, Card, Col, Row, Table} from 'react-bootstrap';
import FaIcon from "../../components/FaIcon";
import {Link} from 'react-router-dom';
import AppConstants from "../../constants/appConstants";
import AppPagination from "../../components/AppPagination";
import alertify from '../../instants/alertify'
import {TApiErrors} from "../../types/TApiErrors";
import AlertErrors from "../../components/AlertErrors";

interface IHookUseUser {
    state: {
        users: IUser[],
        page: number,
        totalItems: number,
        errorsMessages:TApiErrors|undefined
    },
    method: {
        setPage: (page: number) => void,
        removeItem: (id: number) => void
    }
}

const useUser = function (): IHookUseUser {
    let [users, setUsers] = useState<IUser[]>([]);
    let [totalItems, setTotalItems] = useState<number>(0);
    let [page, setPage] = useState<number>(0);
    let [errorsMessages, setErrorsMessages] = useState<TApiErrors>();

    useEffect(function () {
        fetchItems(page);
    }, [page])

    const fetchItems = async (page:number): Promise<void> => {
        let {status, data , error} = await getUsers(page, AppConstants.pagination);
        if (status && data) {
            setUsers(data.content)
            setTotalItems(data.totalElements)
        }
        if (!status && error){
            setErrorsMessages(error)
        }
    }

    const removeItem = (id: number): void => {
        alertify.confirm("You won't be able to revert this.", async function () {
            let {status} = await deleteUser(id.toString());
            if (status) {
                fetchItems(page);
                alertify.success(`Delete item with id is ${id} successfully`);
            } else {
                alertify.error(`Delete item has id: ${id} failed`);
            }
        });
    }

    return {
        state: {
            users,
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
    const {state, method} = useUser();
    return (
        <Row>
            <Col md={12}>
                {state.errorsMessages && <AlertErrors error={state.errorsMessages}/>}
            </Col>
            <Col md={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>
                            User <Link className="btn btn-sm btn-primary" to="/user/create"><i
                            className="fas fa-plus"></i> Add</Link>
                        </Card.Title>

                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-center">
                                <th>Id</th>
                                <th>First Name</th>
                                <th>UserName</th>
                                <th>Status</th>
                                <th className="w-300-px">Function</th>
                            </tr>
                            </thead>
                            <tbody>
                            {state.users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.username}</td>
                                    <td>{user.status ? "Active" : "NonActive"}</td>
                                    <td className="text-center">
                                        <Link className="me-2 text-white btn btn-primary btn-sm"
                                              to={`/user/show/${user.id}`}>
                                            <FaIcon icon="far fa-search"/> Show
                                        </Link>
                                        <Link className="me-2 text-white btn btn-success btn-sm"
                                              to={`/user/edit/${user.id}`}>
                                            <FaIcon icon="far fa-pen"/> Edit
                                        </Link>
                                        <Button className="me-2 text-white" variant="danger" size="sm" onClick={() => {
                                            method.removeItem(user.id)
                                        }}>
                                            <FaIcon icon="far fa-trash-alt"/> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {state.users.length === 0 && <tr>
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
