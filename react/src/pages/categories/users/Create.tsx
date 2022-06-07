import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {useForm, FieldPath} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {IUser} from "../../../types/entities/IUser";
import {createUsers} from "../../../services/userServices";
import {useNavigate} from "react-router-dom";
import {TApiErrors} from "../../../types/TApiErrors";
import AlertErrors from "../../../components/AlertErrors";
import AppForm from "../../../components/AppForm";
import {getRules} from "../../../services/ruleService";
import {IRule} from "../../../types/entities/IRule";

export const ruleSchema = yup.object({
    id:yup.number().required(),
    name: yup.string().required()
}).required();

const schema = yup.object({
    username: yup.string().min(6).max(20).required(),
    fullName: yup.string().min(4).max(255).required(),
    password: yup.string().test("is-password", "Password must be more than 6 characters and less than 12 characters", value => !value || (value.length >= 6 && value.length <= 12)),
    status: yup.boolean().required(),
    rules:yup.array().of(ruleSchema).min(1).required(),
}).required();

const Create = () => {
    const {handleSubmit, setError, control} = useForm<IUser>({
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
    let [rules, setRules] = useState<IRule[]>([]);

    let navigate = useNavigate();

    useEffect(()=>{
        fetchRules().then(console.log)
    },[])

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

    const onSubmit = handleSubmit(async userForm => {
        let {status, error} = await createUsers(userForm);
        if (status) {
            navigate('/user');
        } else {
            setErrorsMessages(error);
            if (!error?.subErrors) return;
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

export default Create;
