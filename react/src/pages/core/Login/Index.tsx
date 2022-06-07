import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {TApiErrors} from "../../../types/TApiErrors";
import {useLocation, useNavigate} from "react-router-dom";
import TFormLogin from "../../../types/auth/TFormLogin";
import AlertErrors from "../../../components/AlertErrors";
import {Row, Spinner} from 'react-bootstrap';
import {useAppDispatch} from "../../../hooks";
import {loginAsync} from "../../../store/auth/authSlice";
import googleConstants from "../../../constants/googleConstants";

const schema = yup.object({
    username: yup.string().min(5).required(),
    password: yup.string().min(4).required(),
}).required();

type TGoogleAuthParams = {
    [key: string]: string
}

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
    }, [])

    const onSubmit = handleSubmit(async loginForm => {
        setIsLoad(true)
        let {status, error} = await dispatch(loginAsync(loginForm)).unwrap();
        setIsLoad(false)
        if (status) {
            navigate("/")
        }
        if (!status && error) {
            setErrorsMessages(error)
        }
    });

    const oauthSignIn = function () {
        // Create <form> element to submit parameters to OAuth 2.0 endpoint.
        const form = document.createElement('form');
        form.setAttribute('method', 'GET');
        form.setAttribute('action', googleConstants.api.auth);

        // Parameters to pass to OAuth 2.0 endpoint.
        const clientId:string = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ""

        const params: TGoogleAuthParams = {
            'client_id': clientId,
            'redirect_uri': `${window.location.origin}/callback`,
            'response_type': 'token',
            'scope': 'openid profile email',
            'include_granted_scopes': 'true',
            'state': 'pass-through value'
        };
        // Add form parameters as hidden input values.
        for (const name in params) {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', name);
            input.setAttribute('value', params[name]);
            form.appendChild(input);
        }

        // Add form to page and submit it to open the OAuth 2.0 endpoint.
        document.body.appendChild(form);
        form.submit();
    }

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
                                        <h2>Oauth</h2>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                        <button className="btn btn-lg btn-outline-light mt-3" type="button"
                                                onClick={oauthSignIn}>
                                            Login with google
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
