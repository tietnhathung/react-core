import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {TApiErrors} from "../../../types/TApiErrors";
import {useNavigate} from "react-router-dom";
import TFormLogin from "../../../types/auth/TFormLogin";
import AlertErrors from "../../../components/AlertErrors";
import {Row, Spinner} from 'react-bootstrap';
import {useAppDispatch} from "../../../hooks/hooks";
import {loginAsync} from "../../../store/auth/authSlice";

const schema = yup.object({
    username: yup.string().min(5).required(),
    password: yup.string().min(4).required(),
}).required();

const Index: React.FC = () => {
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<TFormLogin>({
        resolver: yupResolver(schema)
    });
    let [errorsMessages, setErrorsMessages] = useState<TApiErrors>();
    let [isLoad, setIsLoad] = useState<boolean>(false);
    let navigate = useNavigate();

    useEffect(() => {
        document.title = "Login"
    },[])

    const onSubmit = handleSubmit(async loginForm => {
        setIsLoad(true)
        let {status,error} = await dispatch(loginAsync(loginForm)).unwrap();
        setIsLoad(false)
        if (status){
            navigate("/")
        }
        if (!status && error){
            setErrorsMessages(error)
        }
    });

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <Row>
                            {errorsMessages && <AlertErrors error={errorsMessages}/>}
                        </Row>
                        <div className="card-group d-block d-md-flex row">
                            <div className="card col-md-7 p-4 mb-0">
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p>
                                        <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            <i className="far fa-user"></i>
                                        </span>
                                            <input
                                                className={"form-control " + (errors.username ? "is-invalid" : (isSubmitted ? "is-valid" : ""))}
                                                type="text" placeholder="Username" {...register("username")}/>
                                            {errors.username &&
                                                <div className="invalid-feedback">{errors.username.message}</div>
                                            }
                                        </div>
                                        <div className="input-group mb-4">
                                        <span className="input-group-text">
                                            <i className="far fa-lock-alt"></i>
                                        </span>
                                            <input
                                                className={"form-control " + (errors.password ? "is-invalid" : (isSubmitted ? "is-valid" : ""))}
                                                type="password" placeholder="Password" {...register("password")}
                                                autoComplete="on"/>
                                            {errors.password &&
                                                <div className="invalid-feedback">{errors.password.message}</div>
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                {isLoad ? <Spinner animation="border" variant="primary"/> :
                                                    <button className="btn btn-primary px-4" type="submit">
                                                        Login
                                                    </button>}
                                            </div>
                                            <div className="col-6 text-end">
                                                <button className="btn btn-link px-0" type="button">Forgot password?
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card col-md-5 text-white bg-primary py-5">
                                <div className="card-body text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                        <button className="btn btn-lg btn-outline-light mt-3" type="button">
                                            Register Now!
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
