import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import AlertErrors from "../../../../components/AlertErrors";
import AppForm from "../../../../components/AppForm";
import {TApiErrors} from "../../../../types/TApiErrors";
import {Control} from "react-hook-form/dist/types";
import {IRule} from "../../../../types/entities/IRule";
import {IPermission} from "../../../../types/entities/IPermission";
import {getPermissions} from "../../../../services/permissionService";

type TRuleFromProp = {
    title: string
    onSubmit: () => Promise<void>
    errorsMessages: TApiErrors | undefined
    control: Control<IRule>
}

const RuleForm = (props: TRuleFromProp) => {
    //props
    let {title, errorsMessages, control, onSubmit} = props;

    const [permissions, setPermissions] = useState<IPermission[]>([]);

    useEffect(() => {
        fetchPermissions().then(console.log)
    },[])

    const fetchPermissions = async () => {
        let {status,data} = await getPermissions()
        if (status && data){
            setPermissions(data.content)
        }
        return "Fetch permissions"
    }

    return (
        <Row>
            <Col md={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>
                            {title}
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {errorsMessages && <AlertErrors error={errorsMessages}/>}
                        <Form onSubmit={onSubmit}>
                            <AppForm.GroupInput label="Name" field="name" control={control} type="text"
                                                placeholder="Enter Name"/>
                            <AppForm.GroupSelect isMulti={true} label="Permissions" field="permissions" control={control}
                                                 options={permissions}
                                                 optionLabel="name"/>
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

export default RuleForm;
