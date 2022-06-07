import React, {useCallback, useEffect, useState} from 'react';
import * as yup from "yup";
import {useNavigate, useParams} from "react-router-dom";
import {FieldPath, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {TApiErrors} from "../../../types/TApiErrors";
import {IRule} from "../../../types/entities/IRule";
import {getRule, updateRule} from "../../../services/ruleService";
import RuleForm from "./components/RuleForm";

const schemaPermission = yup.object({
    id: yup.number().required(),
    name: yup.string().required(),
}).required();

export const schema = yup.object({
    name: yup.string().min(4).max(50).required(),
    permissions: yup.array().of(schemaPermission).min(1).required(),
}).required();

const Edit = () => {
    let navigate = useNavigate();
    let [errorsMessages, setErrorsMessages] = useState<TApiErrors>();
    const {handleSubmit, control, setValue, setError} = useForm<IRule>({
        defaultValues: {
            name: "",
            permissions: []
        },
        resolver: yupResolver(schema)
    });
    let {id} = useParams();

    useEffect(() => {
        if (id) {
            fetchItem(parseInt(id)).then(console.log);
        }
    }, [id])

    const fetchItem = useCallback(async (id: number) => {
        let {status, error, data} = await getRule(id);
        if (status && data) {
            setValue("id", data.id)
            setValue("name", data.name)
            setValue("permissions", data.permissions)
        }
        if (!status && error) {
            setErrorsMessages(error)
        }
    }, [setValue])

    const onSubmit = handleSubmit(async ruleForm => {
        if (!id) return;
        let {status, error} = await updateRule(parseInt(id), ruleForm);
        if (status) {
            navigate('/rule');
        } else {
            setErrorsMessages(error);
            if (!error?.subErrors) return;
            error?.subErrors.forEach(function (subError) {
                if ("field" in subError) {
                    setError(subError.field as FieldPath<IRule>, {
                        type: 'server',
                        message: `${subError.field} ${subError.message}`
                    })
                }
            })
        }
    });

    return <RuleForm title="Update Rule" control={control} onSubmit={onSubmit} errorsMessages={errorsMessages}/>;
};

export default Edit;
