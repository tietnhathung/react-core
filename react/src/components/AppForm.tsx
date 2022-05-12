import React from 'react';
import {Form} from "react-bootstrap";
import {Controller} from "react-hook-form";
import {FormControlProps} from "react-bootstrap/FormControl";
import Select from 'react-select';
import {Control, FieldError, FieldPath, FieldValues} from "react-hook-form/dist/types";
import {FormCheckProps} from "react-bootstrap/FormCheck";
import {
    OnChangeValue,
    PropsValue,
} from "react-select/dist/declarations/src/types";

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

interface TAppFormSelectProp<TOption, TFiled extends keyof TOption, TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> extends TAppFormProp<TFieldValues, TName> {
    optionValue?: TFiled
    optionLabel: TFiled
    options: TOption[]
}

const AppSelect = <TOption, TFiled extends keyof TOption, TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: TAppFormSelectProp<TOption, TFiled, TFieldValues, TName>) => {
    let {field, control, options, optionValue, optionLabel} = props;
    return <Controller
        name={field}
        render={({field: {onChange, onBlur, value, name, ref}, fieldState: {error, isTouched}}) => {
            const getValue = (): PropsValue<TOption> => {
                if (optionValue) {
                    let index = options.findIndex(option => option[optionValue as TFiled] === value);
                    if (index >= 0) {
                        return options[index];
                    }
                }
                return value
            }
            const handlerChangeValue = (newValue: OnChangeValue<TOption, false>) => {
                let event = {
                    target: {
                        value: optionValue ? newValue?.[optionValue] : newValue,
                        name: field
                    }
                }
                onChange(event);
            }
            const getOptionLabel = (option: TOption) => {
                return option[optionLabel] as unknown as string;
            }
            const getOptionValue = (option: TOption) => {
                if (optionValue){
                    return option[optionValue] as unknown as string
                }
                return JSON.stringify(option);
            }
            return (
                <>
                    <Select
                        className={error && isTouched ? "is-invalid" : ""}
                        name={name}
                        ref={ref}
                        isClearable
                        onBlur={onBlur}
                        getOptionLabel={getOptionLabel}
                        getOptionValue={getOptionValue}
                        onChange={handlerChangeValue}
                        value={getValue()}
                        options={options}
                    />
                    <Feedback error={error} isTouched={isTouched}/>
                </>
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
