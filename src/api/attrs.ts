
import request from "@/utils/request"

export interface ReqAttrValue {
    // 平台属性名称
    attrName: string;
    //平台属性值的集合
    attrValueList: ReqAttrValueList[];
    //平台属性所属分类ID
    categoryId: number;
    //平台属性所属分类等级
    categoryLevel: number;
    //平台属性ID
    id: number;
}

export interface ReqAttrValueList {
    //平台属性值所属的属性ID
    attrId: number;
    //平台属性值的ID
    id: number;
    //平台属性值的名称
    valueName: string;
}
/**
 * 保存接口需要的数据结构
 */
/* export type ReqSaveAttr = Omit<ResAttr, "id" | "attrValueList"> & {
    attrValueList: Pick<ResAttrValue, "valueName">[];
  }; */
export type ReqSaveAttr = Omit<ReqAttrValue, "id" | "attrValueList"> & {
    attrValueList:Pick<ReqAttrValueList,"valueName">[]
}
enum URLS {
    ATTR_INFO_LIST = '/product/attrInfoList',
    SAVE = "/product/saveAttrInfo",
}

export function reqAttrInfoList(category1Id:string,category2Id:string,category3Id:string) {
return request.get<any,ReqAttrValue[]>(`${URLS.ATTR_INFO_LIST}/${category1Id}/${category2Id}/${category3Id}`)
}
export function reqSaveAttrInfo(data:ReqSaveAttr) {
    return request.post<any,any>(URLS.SAVE,data)
        }