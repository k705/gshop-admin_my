import request from "@/utils/request";


// 数据类型
export interface ResCategoryId1 {
  id: number;
  name: string;
}

export interface ResCategoryId2 extends ResCategoryId1 {
  category1Id: string;
}

export interface ResCategoryId3 extends ResCategoryId1 {
  category2Id: string;
}

enum URLS {
    CATEGORY1 = "/product/getCategory1",
    CATEGORY2 = "/product/getCategory2",
    CATEGORY3 = "/product/getCategory3",
}
// 一级列表请求
export function requestGetCategory1() {
        return request.get<any,ResCategoryId1[]>(URLS.CATEGORY1)
}
    
// 一级列表请求
export function requestGetCategory2(category1Id: string) {
    return request.get<any,ResCategoryId2[]>(`${URLS.CATEGORY2}/${category1Id}`)
}
// 一级列表请求
export function requestGetCategory3(category2Id: string) {
    return request.get<any,ResCategoryId3[]>(`${URLS.CATEGORY3}/${category2Id}`)
}