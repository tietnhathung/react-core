// @ts-ignore
import React,{useId} from 'react';
import {Form} from "react-bootstrap";
import {Controller} from "react-hook-form";
import {FormControlProps} from "react-bootstrap/FormControl";
import ReactSelect from 'react-select';
import {Control, FieldError, FieldPath, FieldValues} from "react-hook-form/dist/types";
import {FormCheckProps} from "react-bootstrap/FormCheck";
import {
    OnChangeValue,
    PropsValue,
} from "react-select/dist/declarations/src/types";

interface IFeedbackProps {
    isTouched: boolean
    error?: FieldError
}

interface IAppFormProp<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
    field: TName
    control?: Control<TFieldValues>
}

interface IAppGroupFormProp<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> extends IAppFormProp<TFieldValues, TName>{
    label:string
}

interface IAppFormSelectProp<TOption, TFiled extends keyof TOption, TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> extends IAppFormProp<TFieldValues, TName> {
    optionValue?: TFiled
    optionLabel: TFiled
    options: TOption[]
}

interface IAppGroupFormSelectProp<TOption, TFiled extends keyof TOption, TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> extends IAppFormSelectProp<TOption,TFiled,TFieldValues,TName> {
    label:string
}

const Feedback = (props: IFeedbackProps) => {
    let {isTouched, error} = props;
    if (error && isTouched) {
        return <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
    }
    return <></>
};

const Input = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: IAppFormProp<TFieldValues, TName> & FormControlProps) => {
    let {field, control, ...formProps} = props;
    return <Controller
        render={({field, fieldState: {error, isTouched}}) => (
            <Form.Control  {...formProps} className={error && isTouched ? "is-invalid" : ""} {...field} />
        )}
        name={field}
        control={control}
    />
};

const GroupInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: IAppGroupFormProp<TFieldValues, TName> & FormControlProps) => {
    let {field, control,label, ...formProps} = props;
    let id = useId();
    return <Controller
        render={({field, fieldState: {error, isTouched}}) => (
            <Form.Group className="mb-3" controlId={`form-${id}`}>
                <Form.Label>{label}</Form.Label>
                <Form.Control  {...formProps} className={error && isTouched ? "is-invalid" : ""} {...field} />
                <Feedback error={error} isTouched={isTouched}/>
            </Form.Group>
        )}
        name={field}
        control={control}
    />
};

const Check = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: IAppFormProp<TFieldValues, TName> & FormCheckProps) => {
    let {field, control, ...formProps} = props;
    return <Controller
        render={({field, fieldState: {error, isTouched}}) => (
            <Form.Check {...formProps} className={error && isTouched ? "is-invalid" : ""} {...field} checked={field.value}/>
        )}
        name={field}
        control={control}
    />
};
const GroupCheck = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: IAppFormProp<TFieldValues, TName> & FormCheckProps) => {
    let {field,label, control, ...formProps} = props;
    const id = useId();
    return <Controller
        render={({field, fieldState: {error, isTouched}}) => (
            <Form.Group className="mb-3" controlId={"form-"+id}>
                <Form.Label>{label}</Form.Label>
                <Form.Check {...formProps} className={error && isTouched ? "is-invalid" : ""} {...field} checked={field.value}/>
                <Feedback error={error} isTouched={isTouched}/>
            </Form.Group>
        )}
        name={field}
        control={control}
    />
};

const Select = <TOption, TFiled extends keyof TOption, TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: IAppFormSelectProp<TOption, TFiled, TFieldValues, TName>) => {
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
                if (optionValue) {
                    return option[optionValue] as unknown as string
                }
                return JSON.stringify(option);
            }
            return <ReactSelect
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
            />;
        }}
        control={control}
    />
};
const GroupSelect = <TOption, TFiled extends keyof TOption, TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: IAppGroupFormSelectProp<TOption, TFiled, TFieldValues, TName>) => {
    let {field,label, control, options, optionValue, optionLabel} = props;
    const id = useId();
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
                if (optionValue) {
                    return option[optionValue] as unknown as string
                }
                return JSON.stringify(option);
            }
            return (
                <Form.Group className="mb-3" controlId={`form-${id}`}>
                    <Form.Label>{label}</Form.Label>
                    <ReactSelect
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
                </Form.Group>
            );
        }}
        control={control}
    />
};

const AppForm = {
    Feedback: Feedback,
    Input: Input,
    GroupInput: GroupInput,
    Check: Check,
    GroupCheck: GroupCheck,
    Select: Select,
    GroupSelect: GroupSelect
};

export default AppForm;
