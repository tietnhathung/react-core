import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {FieldPath, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {IUser} from "../../../types/entities/IUser";
import {getUserById, updateUsers} from "../../../services/userServices";
import {useNavigate, useParams} from "react-router-dom";
import AlertErrors from "../../../components/AlertErrors";
import {TApiErrors} from '../../../types/TApiErrors';
import AppForm from "../../../components/AppForm";
import { useCallback } from 'react';
import {getRules} from "../../../services/ruleService";
import {IRule} from "../../../types/entities/IRule";

export const ruleSchema = yup.object({
    id:yup.number().required(),
    name: yup.string().required()
}).required();
const schema = yup.object({
    id: yup.number().required(),
    username: yup.string().min(6).max(20).required(),
    fullName: yup.string().min(4).max(255).required(),
    password: yup.string().test("is-password", "Password must be more than 6 characters and less than 12 characters", value => !value || (value.length >= 6 && value.length <= 12)),
    status: yup.boolean().required(),
    rules:yup.array().of(ruleSchema).min(1).required(),
}).required();


const Edit = () => {
    const {setValue, setError, handleSubmit, control} = useForm<IUser>({
        defaultValues: {
            username: "",
            fullName: "",
            status: false,
            password: "",
            rules:[]
        },
        resolver: yupResolver(schema)
    });
    let [errorsMessages, setErrorsMessages] = useState<TApiErrors>();
    let navigate = useNavigate();
    let [rules, setRules] = useState<IRule[]>([]);
    let {id} = useParams();

    const fetchItem = useCallback(async (userId: string) => {
        let {status, data, error} = await getUserById(userId)
        if (status && data) {
            setValue("id", data.id);
            setValue("status", data.status);
            setValue("fullName", data.fullName);
            setValue("username", data.username);
            setValue("rules", data.rules);
        } else {
            setErrorsMessages(error)
        }
        return "fetch data done!"
    },[setValue])
    const fetchRules = async () => {
        let {status,data,error } = await getRules();
        if (status && data){
            setRules(data.content)
        }
        if(!status && error){
            setErrorsMessages(error)
        }
        return "fetch rule done!"
    }

    useEffect(function () {
        fetchRules().then(console.log);
        if (id) {
            fetchItem(id).then(console.log);
        }
    }, [id,fetchItem])

    const onSubmit = handleSubmit(async userForm => {
        if (id) {
            let {status, error} = await updateUsers(id, userForm);
            if (status) {
                navigate('/user');
            } else {
                if (error) {
                    setErrorsMessages(error);
                    if (error?.subErrors){
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
                            <AppForm.GroupInput label="User name" field="username" control={control} type="text"
                                           placeholder="Enter username"/>
                            <AppForm.GroupInput label="Full name" field="fullName" control={control} type="text"
                                           placeholder="Enter fullName"/>
                            <AppForm.GroupInput label="Password" field="password" control={control} type="password"
                                           placeholder="Enter password"/>
                            <AppForm.GroupSelect isMulti={true} label="Rules" field="rules" control={control}
                                                 options={rules}
                                                 optionLabel="name"/>
                            <AppForm.GroupCheck label="Status" field="status" control={control} type="switch"/>
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
