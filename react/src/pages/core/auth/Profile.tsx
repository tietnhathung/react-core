import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import AppButton from "../../../components/AppButton";
import {useAppSelector} from "../../../hooks/hooks";
import {authUser, getAuthorities} from "../../../store/auth/authSlice";

const Profile = () => {
    const auth = useAppSelector(authUser)
    console.log(auth)
    const authorities = useAppSelector(getAuthorities)
    return (
        <Row>
            <Col md={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>
                            {auth?.fullName}
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <dl className="row">
                            <dt className="col-sm-3">User name</dt>
                            <dd className="col-sm-9">{auth?.username}</dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-3">Full Name</dt>
                            <dd className="col-sm-9">{auth?.fullName}</dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-3">Status</dt>
                            <dd className="col-sm-9">
                                {auth?.enabled ? "Enabled" : "Disabled"}
                            </dd>
                        </dl>
                        <dl className="row">
                            <dt className="col-sm-3">Authorities</dt>
                            <dd className="col-sm-9">
                                {authorities.join(" | ")}
                            </dd>
                        </dl>
                    </Card.Body>
                    <Card.Footer>
                        <AppButton.Back/>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    );
};

export default Profile;
