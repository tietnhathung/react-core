import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {TApiErrors} from "../../../types/TApiErrors";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {IMenuForm} from "../../../types/entities/IMenu";
import MenuFrom from "./components/MenuFrom";
import {createMenu} from "../../../services/menuServices";
import {FieldPath} from 'react-hook-form';

const schema = yup.object({
    title: yup.string().min(4).max(12).required(),
    url: yup.string().min(4).max(255).required(),
    icon: yup.string().min(3).max(50).required(),
    target: yup.string().required()
}).required();

const Create = () => {
    let navigate = useNavigate();
    const {handleSubmit, control, setError} = useForm<IMenuForm>({
        defaultValues: {
            icon: "",
            title: "",
            target: "",
            url: "",
            parentId: 0
        },
        resolver: yupResolver(schema)
    });

    let [errorsMessages, setErrorsMessages] = useState<TApiErrors>();

    const onSubmit = handleSubmit(async menuForm => {
        let {status, error} = await createMenu(menuForm);
        if (status) {
            navigate('/menu');
        } else {
            setErrorsMessages(error);
            if (!error?.subErrors) return;
            error?.subErrors.forEach(function (subError) {
                if ("field" in subError) {
                    setError(subError.field as FieldPath<IMenuForm>, {
                        type: 'server',
                        message: `${subError.field} ${subError.message}`
                    })
                }
            })
        }
    });

    return <MenuFrom title="Create menu" errorsMessages={errorsMessages} control={control} onSubmit={onSubmit}/>;
};

export default Create;
