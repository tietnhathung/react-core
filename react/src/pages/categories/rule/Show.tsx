import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {TApiErrors} from "../../../types/TApiErrors";
import { Card, Col, Row} from "react-bootstrap";
import AlertErrors from "../../../components/AlertErrors";
import AppButton from "../../../components/AppButton";
import FaIcon from "../../../components/FaIcon";
import {getRule} from "../../../services/ruleService";
import { IRule } from '../../../types/entities/IRule';

const Show = () => {
    let {id} = useParams();
    let [rule,setRule] = useState<IRule>();
    let [errorsMessages, setErrorsMessages] = useState<TApiErrors>();

    useEffect(() => {
        if (id){
            fetchItem(parseInt(id)).then(console.log);
        }
    },[id])

    const fetchItem = async (id: number) => {
        let {status, error, data} = await getRule(id);
        if (status && data) {
            setRule(data)
        }
        if (!status && error) {
            setErrorsMessages(error)
        }
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
                            Menu
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <dl className="row">
                            <dt className="col-sm-3">Rule Name</dt>
                            <dd className="col-sm-9">{rule?.name}</dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-3">Rule permissions</dt>
                            <dd className="col-sm-9">{rule?.permissions?.map<string>(item => item.name).join(" | ")}</dd>
                        </dl>
                    </Card.Body>
                    <Card.Footer>
                        <AppButton.Back />
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    );
};

export default Show;
