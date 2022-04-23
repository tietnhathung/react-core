import React from 'react';
import {Spinner} from 'react-bootstrap'

const Loading: React.FC = () => {
    return (
        <div className="spinner-backdrop">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loading;
