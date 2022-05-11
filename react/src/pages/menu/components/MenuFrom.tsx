import React from 'react';
import {IMenuForm} from "../../../types/entities/IMenu";
import {TApiErrors} from "../../../types/TApiErrors";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import AlertErrors from "../../../components/AlertErrors";
import AppForm from "../../../components/AppForm";
import {Control} from "react-hook-form/dist/types";

type TMenuFromProp = {
    title: string
    onSubmit: () => Promise<void>
    errorsMessages: TApiErrors|undefined
    control: Control<IMenuForm>
}
const MenuFrom = (props:TMenuFromProp) => {
    let {title,errorsMessages,control,onSubmit} = props;
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
                                <AppForm.Input field="title" control={control} type="text" placeholder="Enter title" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label>Url</Form.Label>
                                <AppForm.Input field="url" control={control} type="text" placeholder="Enter url" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label>Icon</Form.Label>
                                <AppForm.Input field="icon" control={control} type="text" placeholder="Enter icon" />
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
