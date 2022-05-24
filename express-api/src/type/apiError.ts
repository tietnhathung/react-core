import ApiSubError from "./apiSubError";

class ApiError {
    status: number
    message: string
    debugMessage: string
    subErrors: ApiSubError[]
}

export default ApiError
