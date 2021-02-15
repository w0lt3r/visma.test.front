export class HttpSuccessWrapper<TData>{
    constructor(
        public data: TData,
        public message: string
    ) { }
}