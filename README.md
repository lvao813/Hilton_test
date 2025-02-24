## 项目启动
<!-- 安装依赖 -->
>终端运行命令 npm i
<!-- 启动 -->
>终端运行命令 npm run start


##  docker启动

### mongoDB启动
>终端运行命令  docker-compose -f mongo-server.yml up -d

### node启动
制作镜像
>终端运行命令  docker build -t hilton_test:test-001 .

启动服务
>终端运行命令  docker-compose -f mongo-server.yml up -d

单元测试
>终端运行命令 mocha

接口调试页面
成功启动之后进入 http://localhost:3000/explorer