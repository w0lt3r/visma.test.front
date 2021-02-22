export class Pagination<TData>{
    constructor(
        public totalCount: number,
        public elements: TData[]
    ) { }
}