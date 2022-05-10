import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {FieldPath, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {IUser} from "../../types/entities/IUser";
import {getUserById, updateUsers} from "../../services/userServices";
import {useNavigate, useParams} from "react-router-dom";
import AlertErrors from "../../components/AlertErrors";
import {TApiErrors} from '../../types/TApiErrors';
import AppForm from "../../components/AppForm";

const schema = yup.object({
    id: yup.number().required(),
    username: yup.string().min(6).max(12).required(),
    fullName: yup.string().min(4).max(255).required(),
    password: yup.string().test("is-password", "Password must be more than 6 characters and less than 12 characters", value => !value || (value.length >= 6 && value.length <= 12)),
    status: yup.boolean().required()
}).required();


const Edit = () => {
    const {setValue, setError, handleSubmit, control} = useForm<IUser>({
        resolver: yupResolver(schema)
    });
    let [errorsMessages, setErrorsMessages] = useState<TApiErrors>();
    let navigate = useNavigate();
    let {id} = useParams();

    useEffect(function () {
        if (id) {
            fetchItem(id).then(console.log);
        }
    }, [id])

    async function fetchItem(userId: string) {
        let {status, data, error} = await getUserById(userId)
        if (status && data) {
            setValue("id", data.id);
            setValue("status", data.status);
            setValue("fullName", data.fullName);
            setValue("username", data.username);
        } else {
            setErrorsMessages(error)
        }
        return "fetch data done!"
    }

    const onSubmit = handleSubmit(async userForm => {
        if (id) {
            let {status, error} = await updateUsers(id, userForm);
            if (status) {
                navigate('/user');
            } else {
                if (error) {
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
            }
        }
    });

    return (
        <Row>
            <Col md={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>
                            Update User
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {errorsMessages && <AlertErrors error={errorsMessages}/>}
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>User name</Form.Label>
                                <AppForm.Input name="username" control={control} type="text"
                                               placeholder="Enter username"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicFullName">
                                <Form.Label>Full name</Form.Label>
                                <AppForm.Input name="fullName" control={control} type="text"
                                               placeholder="Enter fullName"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <AppForm.Input name="password" control={control} type="password"
                                               placeholder="Enter password"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicStatus">
                                <Form.Label>Status</Form.Label>
                                <AppForm.Check name="status" control={control}/>
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

export default Edit;
