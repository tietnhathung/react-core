import React, {useEffect, useState} from 'react';
import {IMenu, IMenuForm} from "../../../types/entities/IMenu";
import {TApiErrors} from "../../../types/TApiErrors";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import AlertErrors from "../../../components/AlertErrors";
import AppForm from "../../../components/AppForm";
import {Control} from "react-hook-form/dist/types";
import {IPermission} from "../../../types/entities/IPermission";
import {getPermissions} from "../../../services/permissionService";
import {getMenus} from "../../../services/menuServices";
import menuConstants from "../../../constants/menuConstants";

type TMenuFromProp = {
    title: string
    onSubmit: () => Promise<void>
    errorsMessages: TApiErrors | undefined
    control: Control<IMenuForm>
}
const MenuFrom = (props: TMenuFromProp) => {
    //props
    let {title, errorsMessages, control, onSubmit} = props;

    //state
    let [permissions, setPermissions] = useState<IPermission[]>([]);
    let [menus, setMenus] = useState<IMenu[]>([]);
    let targetOptions = menuConstants.targets.map<{ id: string, label: string }>(value => ({id: value, label: value}));

    //effect
    useEffect(() => {
        fetchPermissions().then(console.log);
        fetchMenus().then(console.log);
    }, [])

    const fetchPermissions = async (): Promise<string> => {
        let {data, status, error} = await getPermissions();
        if (status && data) {
            setPermissions(data.content)
        }
        if (!status && error) {
            return "fetch permission errors!"
        }
        return "fetch permission done!"
    }
    const fetchMenus = async (): Promise<string> => {
        let {status, data, error} = await getMenus();
        if (status && data) {
            setMenus(data.content)
        }
        if (!status && error) {
            return "fetch menu errors!"
        }
        return "fetch menu done!"
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
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <AppForm.Input field="title" control={control} type="text" placeholder="Enter title"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formUrl">
                                <Form.Label>Url</Form.Label>
                                <AppForm.Input field="url" control={control} type="text" placeholder="Enter url"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formIcon">
                                <Form.Label>Icon</Form.Label>
                                <AppForm.Input field="icon" control={control} type="text" placeholder="Enter icon"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formParent">
                                <Form.Label>Parent</Form.Label>
                                <AppForm.Select field="parentId" control={control} options={menus} optionLabel="title"
                                                optionValue="id"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPermission">
                                <Form.Label>Permission</Form.Label>
                                <AppForm.Select field="permission" control={control} options={permissions}
                                                optionLabel="name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTarget">
                                <Form.Label>Target</Form.Label>
                                <AppForm.Select field="target" control={control} options={targetOptions}
                                                optionLabel="label" optionValue="id"/>
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

export default MenuFrom;
