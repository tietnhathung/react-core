import React, {useEffect, useState} from 'react';
import http from "../../services/axiosClient";
import lineConstants from "../../constants/lineConstants";
import {ILine} from "../../types/entities/ILine";
import {Button, Col, Row, Table, Card, Pagination} from "react-bootstrap";
import FaIcon from "../../components/FaIcon";
import AppPagination from '../../components/AppPagination';

interface IHookUseIndex {
    state: {
        lines: ILine[]
    },
    method: {}
}

const useIndex = function (): IHookUseIndex {
    const [lines, setLines] = useState<ILine[]>([]);

    useEffect(function () {
        (async function fetch() {
            let {status, data} = await http.get(lineConstants.api.get);
            if (status) {
                setLines(data);
            }
        })();
    }, [])

    return {
        state: {
            lines
        },
        method: {}
    }
}

const Index: React.FC = () => {
    let {state} = useIndex();
    return (
        <Row>
            <Col md={12}>
                <Card>
                    <Card.Header>
                        <strong>Table</strong><span className="small ms-1">line</span>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-center">
                                <th>Id</th>
                                <th>First Name</th>
                                <th>UserName</th>
                                <th>Status</th>
                                <th className="w-200-px">Function</th>
                            </tr>
                            </thead>
                            <tbody>
                            {state.lines.map(line => (
                                <tr key={line.id}>
                                    <td>{line.id}</td>
                                    <td>{line.name}</td>
                                    <td>{line.plcAlias}</td>
                                    <td>{line.status ? "Active" : "NonActive"}</td>
                                    <td className="text-center">
                                        <Button className="me-2" variant="primary" size="sm">
                                            <FaIcon icon="far fa-search"/>
                                        </Button>
                                        <Button className="me-2 text-white" variant="success" size="sm">
                                            <FaIcon icon="far fa-edit"/>
                                        </Button>
                                        <Button className="me-2 text-white" variant="danger" size="sm">
                                            <FaIcon icon="far fa-trash-alt"/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    );
};

export default Index;
