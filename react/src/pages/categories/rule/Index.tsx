import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row, Table} from "react-bootstrap";
import AlertErrors from "../../../components/AlertErrors";
import {Link} from "react-router-dom";
import FaIcon from "../../../components/FaIcon";
import AppPagination from "../../../components/AppPagination";
import AppConstants from "../../../constants/appConstants";
import {TApiErrors} from "../../../types/TApiErrors";
import {IRule} from "../../../types/entities/IRule";
import {deleteRule, getRules} from "../../../services/ruleService";
import alertify from "../../../instants/alertify";

const Index = () => {
    let [rules, setRules] = useState<IRule[]>([]);
    let [totalItems, setTotalItems] = useState<number>(0);
    let [page, setPage] = useState<number>(0);
    let [errorsMessages, setErrorsMessages] = useState<TApiErrors>();

    useEffect(() => {
        fetchItems(page).then(console.log)
    },[page])

    const fetchItems = async (page:number) => {
        let {status,data,error } = await getRules(page,AppConstants.pagination);
        if (status && data){
            setTotalItems(data.totalElements)
            setRules(data.content);
        }
        if(!status && error){
            setErrorsMessages(error)
        }

        return "fetch item done!"
    }

    const removeItem = (id: number) => {
        alertify.confirm("You won't be able to revert this.", async function () {
            let {status} = await deleteRule(id);
            if (status) {
                await fetchItems(page);
                alertify.success(`Delete item with id is ${id} successfully`);
            } else {
                alertify.error(`Delete item has id: ${id} failed`);
            }
        });
    }

    return (
        <Row>
            <Col md={12}>
                {errorsMessages && <AlertErrors error={errorsMessages}/>}
            </Col>
            <Col md={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>
                            Rule <Link className="btn btn-sm btn-primary" to="/rule/create">
                            <i className="fas fa-plus"></i> Add
                        </Link>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="text-center">
                                <th style={{width: "100px"}}>Id</th>
                                <th>Name</th>
                                <th className="w-300-px">Function</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rules.map(rule => (
                                <tr key={rule.id}>
                                    <td>{rule.id}</td>
                                    <td>{rule.name}</td>
                                    <td className="text-center">
                                        <Link className="me-2 text-white btn btn-primary btn-sm"
                                              to={`/rule/show/${rule.id}`}>
                                            <FaIcon icon="far fa-search"/> Show
                                        </Link>
                                        <Link className="me-2 text-white btn btn-success btn-sm"
                                              to={`/rule/edit/${rule.id}`}>
                                            <FaIcon icon="far fa-pen"/> Edit
                                        </Link>
                                        <Button className="me-2 text-white" variant="danger" size="sm" onClick={() => {
                                            removeItem(rule.id)
                                        }}>
                                            <FaIcon icon="far fa-trash-alt"/> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {rules.length === 0 && <tr>
                                <td className="text-center" colSpan={3}>No data!</td>
                            </tr>}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <AppPagination page={page} totalItems={totalItems} perPage={AppConstants.pagination}
                                       setPage={setPage}/>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    );
};

export default Index;
