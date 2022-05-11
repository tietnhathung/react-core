import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import {Controller} from "react-hook-form";
import {FormControlProps} from "react-bootstrap/FormControl";
import Select from 'react-select';
import {Control, FieldError, FieldPath, FieldValues} from "react-hook-form/dist/types";
import {FormCheckProps} from "react-bootstrap/FormCheck";

type TFeedbackProps = {
    isTouched: boolean;
    error?: FieldError;
};
const Feedback = (props: TFeedbackProps) => {
    let {isTouched, error} = props;
    if (error && isTouched) {
        return <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
    }
    return <></>
};

type TAppFormProp<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
    field: TName
    control?: Control<TFieldValues>
}

const Input = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: TAppFormProp<TFieldValues, TName> & FormControlProps) => {
    let {field, control, ...formProps} = props;
    return <Controller
        render={({field, fieldState: {error, isTouched}}) => (
            <>
                <Form.Control  {...formProps} className={error && isTouched ? "is-invalid" : ""} {...field} />
                <Feedback error={error} isTouched={isTouched}/>
            </>
        )}
        name={field}
        control={control}
    />
};

const Check = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: TAppFormProp<TFieldValues, TName> & FormCheckProps) => {
    let {field, control, ...formProps} = props;
    return <Controller
        render={({field, fieldState: {error, isTouched}}) => (
            <>
                <Form.Check {...formProps} className={error && isTouched ? "is-invalid" : ""} {...field}/>
                <Feedback error={error} isTouched={isTouched}/>
            </>
        )}
        name={field}
        control={control}
    />
};

type TAppSelectOption = { label: string, value: string | number }
type TAppFormSelectProp<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
    field: TName,
    control?: Control<TFieldValues>
}
const AppSelect = (props: TAppFormSelectProp) => {
    let {field, control} = props;
    return <Controller
        name={field}
        render={({
                     field: {onChange, onBlur, value, name, ref},
                     fieldState: {invalid, isTouched, isDirty, error},
                 }) => {
            return (
                <Select
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    isClearable
                    options={[
                        {value: "chocolate", label: "Chocolate"},
                        {value: "strawberry", label: "Strawberry"},
                        {value: "vanilla", label: "Vanilla"}
                    ]}
                />
            );
        }}
        control={control}
    />
};

const AppForm = {
    Feedback: Feedback,
    Input: Input,
    Check: Check,
    Select: AppSelect
};

export default AppForm;
