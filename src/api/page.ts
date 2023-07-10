// 分页列表请求数据，其中records是列表数据，类型为泛型

export interface ResPage<T>{
    records: T,
    current: number,
    size: number,
    pages: number,
    total:number
}