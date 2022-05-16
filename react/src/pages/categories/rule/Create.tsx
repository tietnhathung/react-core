import React, {useState} from 'react';
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {FieldPath, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {TApiErrors} from "../../../types/TApiErrors";
import {IRule} from "../../../types/entities/IRule";
import {createRule} from "../../../services/ruleService";
import RuleForm from "./components/RuleForm";

const schemaPermission = yup.object({
    id: yup.number().required(),
    name: yup.string().required(),
}).required();

export const schema = yup.object({
    name: yup.string().min(4).max(50).required(),
    permissions: yup.array().of(schemaPermission).min(1).required(),
}).required();

const Create = () => {
    let navigate = useNavigate();
    const {handleSubmit, control, setError} = useForm<IRule>({
        defaultValues: {
            name: "",
            permissions:[]
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = handleSubmit(async ruleForm => {
        let {status, error} = await createRule(ruleForm);
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

    let [errorsMessages, setErrorsMessages] = useState<TApiErrors>();

    return <RuleForm title="Create Rule" control={control} onSubmit={onSubmit} errorsMessages={errorsMessages} />;
};

export default Create;
