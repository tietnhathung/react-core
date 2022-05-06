export type ApiSubError = {
    message:string
}

export interface ApiValidationSubError extends ApiSubError {
    field: string;
    object: string;
    rejectedValue: string;
}

export interface TApiErrors {
    status: string,
    message: string,
    subErrors: (ApiSubError| ApiValidationSubError)[]
}
