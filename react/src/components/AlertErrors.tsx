import React from 'react';
import { Alert } from 'react-bootstrap';
import { TApiErrors } from '../types/TApiErrors';

type AlertErrorsProp = {
    error:TApiErrors
}
const AlertErrors = (props:AlertErrorsProp) => {
    let {error} = props;
    return (
        <Alert variant="danger">
            {error.message}
            {(error.subErrors && error.subErrors.length > 0)&& <ol>
                {error.subErrors.map((subError,index) => <li key={index}>{subError.message}</li> ) }
            </ol>}
        </Alert>
    );
};

export default AlertErrors;
