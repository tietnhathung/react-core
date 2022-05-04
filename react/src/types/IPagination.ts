export default interface IPagination<T = any>{
    totalElements: number;
    content: T[];
}
