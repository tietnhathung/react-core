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

const schema = yup.object({
    id: yup.number().required(),
    username: yup.string().min(6).max(12).required(),
    fullName: yup.string().min(4).max(255).required(),
    password: yup.string().test("is-password", "Password must be more than 6 characters and less than 12 characters", value => !value || (value.length >= 6 && value.length <= 12)),
    status: yup.boolean().required()
}).required();


const Edit = () => {
    const {register, setValue, setError, handleSubmit, formState: {errors, touchedFields}} = useForm<IUser>({
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
                                <Form.Control
                                    className={errors.username && touchedFields.username ? "is-invalid" : ""}
                                    type="text" placeholder="Enter username" {...register("username")} />
                                {(errors.username && touchedFields.username) &&
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username.message}
                                    </Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicFullName">
                                <Form.Label>Full name</Form.Label>
                                <Form.Control
                                    className={errors.fullName && touchedFields.fullName ? "is-invalid" : ""}
                                    type="text" placeholder="Enter fullName" {...register("fullName")} />
                                {(errors.fullName && touchedFields.fullName) &&
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fullName.message}
                                    </Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className={errors.password && touchedFields.password ? "is-invalid" : ""}
                                    type="password" autoComplete="on" placeholder="Password" {...register("password")}/>
                                {(errors.password && touchedFields.password) &&
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password.message}
                                    </Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Check
                                    className={errors.status && touchedFields.status ? "is-invalid" : ""}{...register("status")}/>
                                {(errors.status && touchedFields.status) &&
                                    <Form.Control.Feedback type="invalid">
                                        {errors.status.message}
                                    </Form.Control.Feedback>
                                }
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
