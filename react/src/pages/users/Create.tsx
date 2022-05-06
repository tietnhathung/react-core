import React, {useState} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {useForm,FieldPath} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {IUser} from "../../types/entities/IUser";
import {createUsers} from "../../services/userServices";
import {useNavigate} from "react-router-dom";
import {TApiErrors} from "../../types/TApiErrors";
import AlertErrors from "../../components/AlertErrors";

const schema = yup.object({
    username: yup.string().min(6).max(12).required(),
    fullName: yup.string().min(4).max(255).required(),
    password: yup.string().min(6).max(12).required(),
    status: yup.boolean().required()
}).required();

const Create = () => {
    const {register, handleSubmit, setError,  formState: {errors, isSubmitted}} = useForm<IUser>({
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
                    setError(subError.field as FieldPath<IUser>, {type: 'server', message: `${subError.field} ${subError.message}`})
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
                                    type="password" autoComplete="on" placeholder="Password" {...register("password")}/>
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

export default Create;
