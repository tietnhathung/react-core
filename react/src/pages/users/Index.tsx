import React, {useEffect, useState} from 'react';
import {getUsers} from "../../services/userFetchServices";
import {IUser} from "../../types/entities/IUser";
import {Button, Card, Col, Row, Table} from 'react-bootstrap';
import FaIcon from "../../components/FaIcon";
import { Link } from 'react-router-dom';

interface IHookUseUser {
    state: {
        users: IUser[]
    },
    method: {}
}

const useUser = function (props: any): IHookUseUser {
    let [users, setUsers] = useState<IUser[]>([]);

    useEffect(function () {
        (async function fetch() {
            let resultUser = await getUsers();
            if (resultUser.status) {
                setUsers(resultUser.data)
            }
            return "fetch data done!"
        })();
    }, [])

    return {
        state: {
            users
        },
        method: {}
    }
}

const Index: React.FC = props => {
    const {state} = useUser(props);
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
                </Card>
            </Col>
        </Row>
    );
};
export default Index;
