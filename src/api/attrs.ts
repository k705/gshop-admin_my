import request from "@/utils/request";

// 属性名称类型
export interface ReqAttr {
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

// 属性值数组类型
export interface ReqAttrValueList {
  //平台属性值所属的属性ID
  attrId: number;
  //平台属性值的ID
  id: number;
  //平台属性值的名称
  valueName: string;
}

// 每个属性值类型
export type ReqAttrValue = Pick<ReqAttrValueList, "valueName"> & {
  isEdit?: boolean;
} & {
  id?: number;
  attrId?: number;
};

// 发送存储数据请求时传递的新增属性值的类型
export type ReqSaveAttr = Omit<ReqAttr, "id" | "attrValueList"> & {
  attrValueList: ReqAttrValue[];
} & {
  id?: number;
};
enum URLS {
  ATTR_INFO_LIST = "/product/attrInfoList",
  SAVE = "/product/saveAttrInfo",
  DELETE = "/product/deleteAttr",
}

export function reqAttrInfoList(
  category1Id: string,
  category2Id: string,
  category3Id: string
) {
  return request.get<any, ReqAttr[]>(
    `${URLS.ATTR_INFO_LIST}/${category1Id}/${category2Id}/${category3Id}`
  );
}
export function reqSaveAttrInfo(data: ReqSaveAttr) {
  return request.post<any, any>(URLS.SAVE, data);
}

/* http://gmall-h5-api.atguigu.cn/admin/product/deleteAttr/{id} */

export function reqDeleteAttrInfo(id: number) {
  return request.delete<any, any>(`${URLS.DELETE}/${id}`);
}
