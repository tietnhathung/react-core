import React from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ButtonProps} from "react-bootstrap/Button";

const BackButton = (props: ButtonProps) => {
    const navigate = useNavigate();
    const handlerBack = () => {
        navigate(-1)
    }
    return (
        <Button size="sm" className="me-2 text-white" onClick={handlerBack} {...props}>
            <i className="far fa-undo"></i> Back
        </Button>
    );
};

const AppButton = {
    Back: BackButton
}

export default AppButton;
