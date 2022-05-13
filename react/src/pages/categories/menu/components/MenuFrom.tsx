import React, {useEffect, useState} from 'react';
import {IMenu, IMenuForm} from "../../../../types/entities/IMenu";
import {TApiErrors} from "../../../../types/TApiErrors";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import AlertErrors from "../../../../components/AlertErrors";
import AppForm from "../../../../components/AppForm";
import {Control} from "react-hook-form/dist/types";
import {IPermission} from "../../../../types/entities/IPermission";
import {getPermissions} from "../../../../services/permissionService";
import {getMenus} from "../../../../services/menuServices";
import menuConstants from "../../../../constants/menuConstants";

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
                            <AppForm.Input title="Title" field="title" control={control} type="text"
                                           placeholder="Enter title"/>
                            <AppForm.Input title="Url" field="url" control={control} type="text"
                                           placeholder="Enter url"/>
                            <AppForm.Input title="Icon" field="icon" control={control} type="text"
                                           placeholder="Enter icon"/>
                            <AppForm.Select title="Parent" field="parentId" control={control} options={menus}
                                            optionLabel="title"
                                            optionValue="id"/>
                            <AppForm.Select title="Permission" field="permission" control={control}
                                            options={permissions}
                                            optionLabel="name"/>
                            <AppForm.Select title="Target" field="target" control={control} options={targetOptions}
                                            optionLabel="label" optionValue="id"/>
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
