import request from "@/utils/request";
import type { ResPage } from "./page";

// 定义结果中列表数据records类型并导出
export interface ResTrademark {
  id: number;
  tmName: string;
  logoUrl: string;
}
// 分页列表所有数据类型并导出
export type ResTrademarkByPage = ResPage<ResTrademark[]>;
export type ReqEditBaseTrademark = ResTrademark;
// 定义数据类型
export interface ReqSaveBaseTrademark {
  tmName: string;
  logoUrl: string;
}
enum URLS {
  LIST = "/product/baseTrademark",
    ADD = "/product/baseTrademark/save",
    /* http://gmall-h5-api.atguigu.cn/admin/product/baseTrademark/update */
  EDIT="/product/baseTrademark/update"
}

// 请求品牌列表数据
export function requestTrademarkListByPage(page = 1, limit = 5) {
  return request.get<any, ResTrademarkByPage>(`${URLS.LIST}/${page}/${limit}`);
}

/* -----------------------------添加页---------- */

// 添加品牌请求
export function requestSaveBaseTrademark(data: ReqSaveBaseTrademark) {
  return request.post<any, null>(URLS.ADD, data);
}

/* ------------编辑品牌---------- */
export function requestEditBaseTrademark(data: ReqEditBaseTrademark) {
  return request.put<any, null>(URLS.EDIT, data);
}
