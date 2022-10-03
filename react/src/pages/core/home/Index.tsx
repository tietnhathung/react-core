import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import SockJS from "sockjs-client";
import Stomp, {Client} from "stompjs";
import tokenService from "../../../services/tokenService";

const Index = () => {

    let [stompClient ,setStompClient] = useState<Client|null>(null);
    const [serverTime,setServerTime] = useState<string>("");
    const [message,setMessage] = useState<string>("");
    const headersSocket = {};
    function connectWs() {
        let baseUrl = process.env.REACT_APP_SOCKET_BASE_URL;
        let accessToken = tokenService.getAccessToken();

        let socket = new SockJS(baseUrl+'?access_token='+accessToken);
        let sc = Stomp.over(socket);
        sc.connect(headersSocket, function () {
            sc.subscribe('/topic/server-time', function (message) {
                setServerTime(message.body);
            });
        });
        setStompClient(sc)
    }

    function sendMessage() {
        if (stompClient == null){
            console.log("sendMessage null")
            return;
        }
        stompClient.send("/app/message", {}, message)
    }

    useEffect(function () {
        connectWs();
    },[])

    return (
        <Row>
            <Col md={12}>
                <h1 className="text-center">Home</h1>
                <p className="text-center">Server time:{serverTime}</p>
            </Col>
            <Col md={12}>
                <input className="form-control" type="text" value={message} onChange={ev => {setMessage(ev.target.value)}} />
                <button className="btn btn-secondary" onClick={sendMessage}>Send message</button>
            </Col>
        </Row>
    );
};

export default Index;
