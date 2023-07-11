import request from "@/utils/request"
import type { ResPage } from "./page"

// 定义结果中列表数据records类型并导出
export interface ResTrademark{
    id: number,
    tmName: string,
    logoUrl:string
}
// 分页列表所有数据类型并导出
export type ResTrademarkByPage = ResPage<ResTrademark[]>;

enum URLS{
    LIST = "/product/baseTrademark",
    ADD = "/product/baseTrademark/save",
    UPDATE = "/product/baseTrademark/update"
}

// 请求品牌列表数据
export function requestTrademarkListByPage(page =1,limit=5) {
        return request.get<any,ResTrademarkByPage>(`${URLS.LIST}/${page}/${limit}`)
    }


/* -----------------------------添加页---------- */
    // 定义数据类型
export type ReqSaveBaseTrademark = Omit<ResTrademark,"id">
    // 添加品牌请求
export function requestSaveBaseTrademark(data:ReqSaveBaseTrademark) {
    return request.post<any,null>(URLS.ADD,data)
}

/* -----------------编辑更新-------------------- */
// 定义数据类型
export type ReqUpdateBaseTrademark = ResTrademark

// 编辑品牌请求
export function requestUpdateBaseTrademark(data:ReqUpdateBaseTrademark) {
        return request.put<any,null>(URLS.UPDATE,data)
    }