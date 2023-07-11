import request from "@/utils/request";
/* http://gmall-h5-api.atguigu.cn/admin/product/getCategory1 

http://gmall-h5-api.atguigu.cn/admin/product/getCategory2/{category1Id}

http://gmall-h5-api.atguigu.cn/admin/product/getCategory3/{category2Id}*/

// 请求地址
enum URLS {
  CATEGORY1 = "/product/getCategory1",
  CATEGORY2 = "/product/getCategory2",
  CATEGORY3 = "/product/getCategory3",
}
// 类型

export interface ResCategory1Id {
  //分类ID
  id: number;
  //分类名称
  name: string;
}
export interface ResCategory2Id extends ResCategory1Id {
  category1Id: number;
}
export interface ResCategory3Id extends ResCategory1Id {
  category2Id: number;
}
// 请求
export function reqGetCategory1() {
  return request.get<any, ResCategory1Id[]>(URLS.CATEGORY1);
}
export function reqGetCategory2(category1Id: number) {
  return request.get<any, ResCategory2Id[]>(`${URLS.CATEGORY1}${category1Id}`);
}
export function reqGetCategory3(category2Id: number) {
  return request.get<any, ResCategory3Id[]>(`${URLS.CATEGORY1}${category2Id}`);
}
