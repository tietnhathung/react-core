import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import {useNavigate, useParams} from "react-router-dom";
import {FieldPath, useForm} from "react-hook-form";
import {IMenuForm} from "../../types/entities/IMenu";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {TApiErrors} from "../../types/TApiErrors";
import {createMenu, getMenuById, updateMenu} from "../../services/menuServices";
import MenuFrom from "./components/MenuFrom";

const schema = yup.object({
    title: yup.string().min(4).max(12).required(),
    url: yup.string().min(4).max(255).required(),
    icon: yup.string().min(3).max(50).required(),
    target: yup.string().required()
}).required();

const Edit = () => {
    let navigate = useNavigate();
    const {handleSubmit, control, setValue, setError} = useForm<IMenuForm>({
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
    let {id} = useParams();

    useEffect(() => {
        if (id){
            fetchMenu(parseInt(id)).then(console.log);
        }
    },[id])

    const fetchMenu = async (id: number) => {
        let {status, data, error} = await getMenuById(id)
        if (status && data) {
            setValue("id", data.id);
            setValue("title", data.title);
            setValue("url", data.url);
            setValue("icon", data.icon);
            setValue("target", data.target);
            setValue("parentId", data.parentId);
            setValue("permission", data.permission);
        } else {
            setErrorsMessages(error)
        }
        return "fetch menu done!"
    }

    const onSubmit = handleSubmit(async menuForm => {
        if(id){
            let {status, error} = await updateMenu(parseInt(id),menuForm);
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
        }
    });

    return <MenuFrom title="Update menu" errorsMessages={errorsMessages} control={control} onSubmit={onSubmit}/>;
};

export default Edit;
