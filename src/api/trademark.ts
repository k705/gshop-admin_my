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

enum URLS {
  LIST = "/product/baseTrademark",
  ADD = "/product/baseTrademark/save",
  UPDATE = "/product/baseTrademark/update",
}

// 请求品牌列表数据
export function requestTrademarkListByPage(page = 1, limit = 5) {
  return request.get<any, ResTrademarkByPage>(`${URLS.LIST}/${page}/${limit}`);
}

/* -----------弹出添加品牌框--------- */
// 定义数据类型
export interface ReqSaveTrademark {
  tmName: string;
  logoUrl: string;
}

// 请求数据
export function requestSaveTrademark(data: ReqSaveTrademark) {
  return request.post<any, null>(URLS.ADD, data);
}

/* -------------编辑品牌------------------ */
// 定义数据类型
export type ReqEditTrademark = ResTrademark;
export function requestEditTrademark(data: ReqEditTrademark) {
  return request.put<any, null>(URLS.UPDATE, data);
}
