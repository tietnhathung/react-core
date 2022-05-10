import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getUserById} from "../../services/userServices";
import {IUser} from "../../types/entities/IUser";
import {TApiErrors} from "../../types/TApiErrors";
import { Card, Col, Row} from "react-bootstrap";
import AlertErrors from "../../components/AlertErrors";
import AppButton from "../../components/AppButton";
import dateUtils from "../../utils/dateUtils";

const Show = () => {
    let {id} = useParams();
    let [user,setUser] = useState<IUser>();
    let [errorsMessages, setErrorsMessages] = useState<TApiErrors>();


    useEffect(function () {
        if (id) {
            fetchItem(id).then(console.log);
        }
    }, [id])

    async function fetchItem(userId: string) {
        let {status, data, error} = await getUserById(userId)
        if (status && data) {
            setUser(data)
        } else {
            setErrorsMessages(error)
        }
        return "Fetch data done!"
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
                            {user?.fullName}
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <dl className="row">
                            <dt className="col-sm-3">User name</dt>
                            <dd className="col-sm-9">{user?.username}</dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-3">Full Name</dt>
                            <dd className="col-sm-9">{user?.fullName}</dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-3">Status</dt>
                            <dd className="col-sm-9">{user?.status ? "Active" : "UnActive"}</dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-3">Create at</dt>
                            <dd className="col-sm-9">{dateUtils.datetimeFormat(user?.createdAt)}</dd>
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
