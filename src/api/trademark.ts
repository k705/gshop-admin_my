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
    LIST = "/product/baseTrademark"
}

// 请求品牌列表数据
export function requestTrademarkListByPage(page =1,limit=5) {
        return request.get<any,ResTrademarkByPage>(`${URLS.LIST}/${page}/${limit}`)
    }