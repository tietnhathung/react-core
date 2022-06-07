import React, {useCallback, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {googleLoginAsync} from "../../../store/auth/authSlice";
import {useAppDispatch} from "../../../hooks";
import alertify from "../../../instants/alertify";
import Loading from "../../../components/Loading";

type TParams = {
    [key: string]: string
}
const Callback = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const tryLoginRequest = useCallback( async (params)=>{
        if (params && params['access_token']) {
            try {
                let {status, error} = await dispatch(googleLoginAsync(params['access_token'])).unwrap();
                if (status) {
                    navigate("/")
                    return "login login success"
                }else{
                    alertify.error(`Login failure: ${error?.message}`);
                    navigate("/login")
                    return "login login failure"
                }
            }catch (e) {
                alertify.error(`Login failure: ${e?.message}`);
                navigate("/login")
                return "login login failure"
            }
        }
        return "login login failure"
    },[dispatch,navigate])

    useEffect( () => {
        const fragmentString = location.hash.substring(1);
        const params: TParams = {};
        const regex = /([^&=]+)=([^&]*)/g;
        let m;
        while (m = regex.exec(fragmentString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        if (Object.keys(params).length > 0) {
            if (params['state'] && params['state'] === 'pass-through value') {
                tryLoginRequest(params).then(console.log);
            }else{
                alertify.error(`Login failure can't get token from google`);
                navigate("/login")
            }
        }else{
            alertify.error(`Login failure can't get token from google`);
            navigate("/login")
        }
    }, [location.hash,navigate,tryLoginRequest])

    return <Loading />;
};

export default Callback;
