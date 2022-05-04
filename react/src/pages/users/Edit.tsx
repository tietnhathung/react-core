import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
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
    const {register, setValue, handleSubmit, formState: {errors, isSubmitted}} = useForm<IUser>({
        resolver: yupResolver(schema)
    });
    let [errorsMessages, setErrorsMessages] = useState<TApiErrors>();
    let navigate = useNavigate();
    let {id} = useParams();

    useEffect(function () {
        if (id) {
            fetchItem(id);
        }
    })

    const fetchItem = async (userId: string) => {
        let {status, data, error} = await getUserById(userId)
        if (status && data) {
            setValue("id", data.id);
            setValue("status", data.status);
            setValue("fullName", data.fullName);
            setValue("username", data.username);
        } else {
            setErrorsMessages(error)
        }
    }

    const onSubmit = handleSubmit(async userForm => {
        if (id) {
            let {status, error} = await updateUsers(id, userForm);
            if (status) {
                navigate('/user');
            } else {
                if (error) {
                    setErrorsMessages(error);
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
                            Create User
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {errorsMessages && <AlertErrors error={errorsMessages}/>}
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>User name</Form.Label>
                                <Form.Control
                                    className={errors.username ? "is-invalid" : (isSubmitted ? "is-valid" : "")}
                                    type="text" placeholder="Enter username" {...register("username")} />
                                {errors.username &&
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username.message}
                                    </Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicFullName">
                                <Form.Label>Full name</Form.Label>
                                <Form.Control
                                    className={errors.fullName ? "is-invalid" : (isSubmitted ? "is-valid" : "")}
                                    type="text" placeholder="Enter fullName" {...register("fullName")} />
                                {errors.fullName &&
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fullName.message}
                                    </Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className={errors.password ? "is-invalid" : (isSubmitted ? "is-valid" : "")}
                                    type="password" placeholder="Password" {...register("password")}/>
                                {errors.password &&
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password.message}
                                    </Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Check
                                    className={errors.password ? "is-invalid" : (isSubmitted ? "is-valid" : "")}{...register("status")}/>
                                {errors.status &&
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
