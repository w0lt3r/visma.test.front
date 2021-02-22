export class Paginator<TData>{
    constructor(
        public filter: TData,
        public pageSize: number,
        public pageNumber: number,
    ) { }
}