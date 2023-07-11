import request from "@/utils/request"

enum URLS {
    ATTR_INFO_LIST = "/product/attrInfoList",
}
export interface ReqAttrInfo {
     attrName?: string;
    // 平台属性名称
   attrValueList?: ReqAttrInfoList[];
   // 平台属性值的集合
    categoryId?: number;
    // 平台属性所属分类ID  
    categoryLevel?: number;    
    // 平台属性所属分类等级
      id?: number;
// 平台属性ID
}

export interface ReqAttrInfoList {
    // 平台属性值所属的属性ID     
    attrId?: number;   
   //  平台属性值的ID    
    id?: number;   
    // 平台属性值的名称    
    valueName?: string;
}

// 请求
// http://gmall-h5-api.atguigu.cn/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export function reqAttrInfoList(category1Id: string,category2Id: string,category3Id: string) {
        return request.get<any, ReqAttrInfo[]>(`${URLS.ATTR_INFO_LIST}/${category1Id}/${category2Id}/${category3Id}`)
    }