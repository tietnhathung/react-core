import React from 'react';

const Index: React.FC = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card-group d-block d-md-flex row">
                            <div className="card col-md-7 p-4 mb-0">
                                <div className="card-body">
                                    <h1>Login</h1>
                                    <p className="text-medium-emphasis">Sign In to your account</p>
                                    <div className="input-group mb-3"><span className="input-group-text">
                                    </span>
                                        <input className="form-control" type="text" placeholder="Username"/>
                                    </div>
                                    <div className="input-group mb-4"><span className="input-group-text"></span>
                                        <input className="form-control" type="password" placeholder="Password"/>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <button className="btn btn-primary px-4" type="button">Login</button>
                                        </div>
                                        <div className="col-6 text-end">
                                            <button className="btn btn-link px-0" type="button">Forgot password?
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card col-md-5 text-white bg-primary py-5">
                                <div className="card-body text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <button className="btn btn-lg btn-outline-light mt-3" type="button">Register
                                            Now!
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
