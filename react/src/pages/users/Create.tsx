import React, {useState} from 'react';
import {Alert, Button, Card, Col, Form, Row, Table} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {IUser} from "../../types/entities/IUser";
import {createUsers} from "../../services/userFetchServices";
import {useNavigate} from "react-router-dom";


const schema = yup.object({
    username: yup.string().min(6).max(12).required(),
    fullName: yup.string().min(4).max(255).required(),
    password: yup.string().min(6).max(12).required(),
    status: yup.boolean().required()
}).required();

const Create = () => {
    const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<IUser>({
        resolver: yupResolver(schema)
    });
    let [errorsMessages, setErrorsMessages] = useState<string[]>([]);

    let navigate = useNavigate();

    const onSubmit = handleSubmit(async userForm => {
        let {status, data, error} = await createUsers(userForm);
        if (status) {
            navigate('user');
        } else {
            let errors:string[] = [];
            Object.keys(error).forEach(key => {
                errors.push(`${key}: ${error[key]}`);
            });
            setErrorsMessages(errors);
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
                        {errorsMessages.map((error, index) => <Alert key={index} variant="danger">  {error}  </Alert>)}
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

export default Create;