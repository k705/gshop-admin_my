# 项目

## 说明
* 基于Vue3的电商中台管理项目
* 技术栈: TS + Vue3 + VueRouter4 + Pinia + ElementPlus
* 当前为完成版
* 学习参见 文档 文件夹下的MD文件

## API  axios请求数据
1. swagger 是一个 API 管理工具，一般由后端同学提供，后端同学在开发接口的时候通常会使用一些工具来自动生成对应的接口文档（类似工具还有如 postman、foxapi、apipost等）。
2. 权限管理: http://39.98.123.211:8170/swagger-ui.html
3. 商品管理：http://39.98.123.211:8510/swagger-ui.html
4. 链接: https://apifox.com/apidoc/shared-bc8bcc84-30fe-43aa-8151-32ea6b1d229e?pwd=2iIoWi3L  访问密码: 2iIoWi3L
5. 如果你想用web版，可以安装 插件，才能进行本地调试：https://apifox.com/help/app/web/browser-extension

## 根据路由表动态生成菜单
1. router文件夹
    - index
    - routes
    路由表
2. views文件夹
    - 根据路由表建立路由
3. App.vue中用 <router-view />占位 

## 商品管理
### 品牌管理
1. card组件：卡片包含标题，内容以及操作区域。
    - Card 组件由 header 和 body 组成。 
        - header 是可选的，其内容取决于一个具名的 slot。
        - header是button组件
        - body是table组件和pagination组件
1. 自定义router-link结构
2. 使用element库生成icon图片

3. axios请求库的二次封装解析 
4. Proxy响应式的基本原理实现
5. 获取品牌数据并渲染


2. 分页pagination的使用

elementUI中model和dialog
