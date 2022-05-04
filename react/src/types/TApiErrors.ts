type ApiSubError = Record<string, any>

export interface TApiErrors {
    status: string,
    message: string,
    subErrors: ApiSubError[]
}
