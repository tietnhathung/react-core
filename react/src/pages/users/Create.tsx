import React, {useState} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {useForm, FieldPath} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {IUser} from "../../types/entities/IUser";
import {createUsers} from "../../services/userServices";
import {useNavigate} from "react-router-dom";
import {TApiErrors} from "../../types/TApiErrors";
import AlertErrors from "../../components/AlertErrors";
import AppForm from "../../components/AppForm";

const schema = yup.object({
    username: yup.string().min(6).max(12).required(),
    fullName: yup.string().min(4).max(255).required(),
    password: yup.string().min(6).max(12).required(),
    status: yup.boolean().required()
}).required();

const Create = () => {
    const {handleSubmit, setError, control} = useForm<IUser>({
        resolver: yupResolver(schema)
    });
    let [errorsMessages, setErrorsMessages] = useState<TApiErrors>();

    let navigate = useNavigate();

    const onSubmit = handleSubmit(async userForm => {
        let {status, error} = await createUsers(userForm);
        if (status) {
            navigate('/user');
        } else {
            setErrorsMessages(error);
            error?.subErrors.forEach(function (subError) {
                if ("field" in subError) {
                    setError(subError.field as FieldPath<IUser>, {
                        type: 'server',
                        message: `${subError.field} ${subError.message}`
                    })
                }
            })
        }
    });

    return (
        <Row>
            <Col md={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>
                            Create User
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {errorsMessages && <AlertErrors error={errorsMessages}/>}
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>User name</Form.Label>
                                <AppForm.Input field="username" control={control} type="text"
                                               placeholder="Enter username"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicFullName">
                                <Form.Label>Full name</Form.Label>
                                <AppForm.Input field="fullName" control={control} type="text"
                                               placeholder="Enter fullName"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <AppForm.Input field="password" control={control} type="password"
                                               placeholder="Enter password"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicStatus">
                                <Form.Label>Status</Form.Label>
                                <AppForm.Check field="status" control={control}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Create;
