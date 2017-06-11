# ECharts 微信运动展示

> A Vue.js project

项目使用vue2.0、vuex、axios、ECharts 对微信运动最近31天进行展示。后端使用nodejs、Express、mongodb进行数据保存。

安装

``` bash
npm install
npm run dev
npm run build
```

#### 微信获取运动部分
1. 使用已上线的-小书生Lite。进行用户数据收集。
2. 调用相关微信接口，发送数据到后台采集用户运动数据，保存至后端数据库。
3. 自行生成一个runID用于网页查询自己的最近运动数据。
4. <a href="https://github.com/bitqiang/wx-book">微信小程序相关代码请查看</a>


#### vue、ECharts前端部分
1. 首页输入微信端自行设置的runID进行数据获取
2. 数据获取通过axios进行请求数据，保存vuex
3. 使用了ECharts进行数据展示


#### 后端部分 
1. 使用了nodejs，用Express框架进行开发
2. 处理前端发送的微信数据进行处理保存
3. 将用户数据保存至mongodb数据库
4. 提供接口获取了用户的运动数据
5. <a href="https://github.com/bitqiang/a-litter-bit/tree/master/api">后端部分代码请移动至</a>


