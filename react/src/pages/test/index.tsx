import React, {FormEvent, FormEventHandler, useEffect, useState} from "react";
import Stomp, {Client} from "stompjs";
import tokenService from "../../services/tokenService";
import SockJS from "sockjs-client";
import {Button, Card, Col, Form, Row} from "react-bootstrap";

const Index = () => {

    let [stompClient, setStompClient] = useState<Client | null>(null);
    const [serverTime, setServerTime] = useState<number | null>(null);
    const [message, setMessage] = useState<string>("");
    const headersSocket = {};

    function connectWs() {
        let baseUrl = process.env.REACT_APP_SOCKET_BASE_URL;
        let accessToken = tokenService.getAccessToken();

        let socket = new SockJS(baseUrl + '?access_token=' + accessToken);
        let sc = Stomp.over(socket);
        sc.connect(headersSocket, function () {
            sc.subscribe('/topic/server-time', function (message) {
                setServerTime(parseInt(message.body));
            });
        });
        setStompClient(sc)
    }

    function sendMessage(event: FormEvent) {
        event.preventDefault();
        if (stompClient === null) {
            console.log("sendMessage null")
            return;
        }
        stompClient.send("/app/api/test/message", {}, message)
    }

    useEffect(function () {
        connectWs();
    }, []);

    function bindTime(time: number | null): string {
        if (time == null) {
            return "";
        }
        return new Date(time).toLocaleString()
    }

    return (
        <Row>
            <Col md={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>Test Socket Server time: {bindTime(serverTime)}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={sendMessage}>
                            <Form.Group className="mb-3">
                                <Form.Label>Message</Form.Label>
                                <input className="form-control" type="text" value={message} onChange={ev => {
                                    setMessage(ev.target.value)
                                }}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Send message
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Index;
