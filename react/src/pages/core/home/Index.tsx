import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import SockJS from "sockjs-client";
import Stomp, {Client} from "stompjs";

const Index = () => {

    const [stompClient,setStompClient] = useState<Client|null>(null);
    const [serverTime,setServerTime] = useState<string>("");

    function connectWs() {
        let socket = new SockJS('http://localhost:8080/ws');
        let stompClient = Stomp.over(socket);
        stompClient.connect({}, function () {
            stompClient.subscribe('/topic/server-time', function (greeting) {
                setServerTime(greeting.body);
            });
        });
        setStompClient(stompClient)
    }

    function disconnectWs() {
        stompClient?.disconnect(function () {
            console.log("disconnect socket")
        });
    }

    useEffect(function () {
        connectWs();
        return () => {
            disconnectWs();
        }
    },[])

    return (
        <Row>
            <Col md={12}>
                <h1 className="text-center">Home</h1>
                <p className="text-center">Server time:{serverTime}</p>
            </Col>
        </Row>
    );
};

export default Index;
