import React, {useEffect, useState} from 'react';
import {getUsers} from "../../services/userFetchServices";
import {IUser} from "../../types/entities/IUser";
import {Button, Card, Col, Row, Table} from 'react-bootstrap';
import FaIcon from "../../components/FaIcon";
import { Link } from 'react-router-dom';
import AppConstants from "../../constants/appConstants";
import AppPagination from "../../components/AppPagination";
interface IHookUseUser {
    state: {
        users: IUser[],
        page:number,
        totalItems:number

    },
    method: {
        setPage:(page:number) => void
    }
}

const useUser = function (props: any): IHookUseUser {
    let [users, setUsers] = useState<IUser[]>([]);
    let [totalItems, setTotalItems] = useState<number>(0);
    let [page, setPage] = useState<number>(0);

    useEffect(function () {
        (async function fetch() {
            let {status,data} = await getUsers(page,AppConstants.pagination);
            if (status) {
                setUsers(data.content)
                setTotalItems(data.totalElements)
            }
            return "fetch data done!"
        })();
    }, [page])

    return {
        state: {
            users,
            page,
            totalItems
        },
        method: {
            setPage
        }
    }
}

const Index: React.FC = props => {
    const {state,method} = useUser(props);
    return (
        <Row>
            <Col md={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>
                            User <Link className="btn btn-sm btn-primary" to="/user/create"><i className="fas fa-plus"></i> Add</Link>
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
                                    <td>{user.status?"Active" :"NonActive"}</td>
                                    <td className="text-center">
                                        <Button className="me-2" variant="primary"  size="sm">
                                            <FaIcon icon="far fa-search" /> Show
                                        </Button>
                                        <Button className="me-2 text-white" variant="success"  size="sm">
                                            <FaIcon icon="far fa-pen" /> Edit
                                        </Button>
                                        <Button className="me-2 text-white" variant="danger"  size="sm">
                                            <FaIcon icon="far fa-trash-alt" /> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <AppPagination page={state.page} totalItems={state.totalItems}  perPage={AppConstants.pagination} setPage={method.setPage} />
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    );
};
export default Index;
