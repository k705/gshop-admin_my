import request from "@/utils/request"

enum URLS {
    CATEGORY1 = '/product/getCategory1',
    CATEGORY2 = '/product/getCategory2',
    CATEGORY3 = '/product/getCategory3',

}

// http://gmall-h5-api.atguigu.cn/admin/product/getCategory1

/**
 * 分类列表
 */
export interface ResCategory1 {
    /**
     * 分类ID
     */
    id: number;
    /**
     * 分类名称
     */
    name: string;
}
export function reqGetCategory1() {
        return request.get<any,ResCategory1[]>(URLS.CATEGORY1)
    }
// http://gmall-h5-api.atguigu.cn/admin/product/getCategory2/{category1Id}
/**
 * 分类列表
 */
export interface ResCategory2 extends ResCategory1{
    /**
     * 父级（一级）分类ID
     */
    category1Id: number;
  
}
export function reqGetCategory2(category1Id:number) {
    return request.get<any,ResCategory2[]>(`${URLS.CATEGORY2}/${category1Id}`)
}
// http://gmall-h5-api.atguigu.cn/admin/product/getCategory3/{category2Id}
/**
 * 分类列表
 */
export interface ResCategory3  extends ResCategory1{
    /**
     * 父级（二级）分类ID
     */
    category2Id: number;
    
}
export function reqGetCategory3(category2Id:number) {
    return request.get<any,ResCategory3[]>(`${URLS.CATEGORY3}/${category2Id}`)
}