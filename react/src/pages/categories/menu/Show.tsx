import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {TApiErrors} from "../../../types/TApiErrors";
import { Card, Col, Row} from "react-bootstrap";
import AlertErrors from "../../../components/AlertErrors";
import AppButton from "../../../components/AppButton";
import {getMenuById} from "../../../services/menuServices";
import {IMenu} from "../../../types/entities/IMenu";
import FaIcon from "../../../components/FaIcon";

const Show = () => {

    let {id} = useParams();
    let [menu,setMenu] = useState<IMenu>();
    let [errorsMessages, setErrorsMessages] = useState<TApiErrors>();

    useEffect(() => {
        if (id){
            fetchMenu(parseInt(id)).then(console.log);
        }
    },[id])

    const fetchMenu = async (id: number) => {
        let {status, data, error} = await getMenuById(id)
        if (status && data) {
            setMenu(data)
        } else {
            setErrorsMessages(error)
        }
        return "fetch menu done!"
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
                            <dt className="col-sm-3">menu title</dt>
                            <dd className="col-sm-9">{menu?.title}</dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-3">Menu url</dt>
                            <dd className="col-sm-9">{menu?.url}</dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-3">Menu icon</dt>
                            <dd className="col-sm-9">
                                <FaIcon icon={menu?.icon??""} />
                            </dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-3">Menu permission</dt>
                            <dd className="col-sm-9">{menu?.permission?.name}</dd>
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
