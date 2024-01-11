# Poetize（Vue2）

## 网站示例
[poetize.cn](https://poetize.cn)

## 技术栈
前端技术：Vue2（博客系统），Vue3（IM 聊天室系统），Element UI（Vue2），Element-Plus UI（Vue3），Naive UI（Vue3）

后端技术：Java，Spring Boot，spring-boot-starter-mail，Mysql，Mybatis-Plus，t-io，qiniu-java-sdk

## 网站简介
这是一个 Spring Boot + Vue2 + Vue3 的产物。

网站分两个模块：
- 博客系统：具有文章，表白墙，图片墙，收藏夹，乐曲，视频播放，留言，友链，时间线，后台管理等功能。
- 聊天室系统：具有朋友圈（时间线），好友，群等功能。

本网站采用前后端分离进行实现，两个前端项目通过Nginx代理，后端使用Java。
启动网站需要安装Nginx、Java、MySQL，然后打包前后端项目并部署。
文件服务可以使用七牛云，也可以使用服务器。
Vue3（IM 聊天室系统）是非必须的，如果部署需要依赖博客，然后从博客的非礼勿言进入，因为登录模块在博客。

nginx配置示例：
```
worker_processes  1;
 
events {
    worker_connections  1024;
}
 
http {
    include            mime.types;
 
    default_type       application/octet-stream;
 
    sendfile           on;
 
    keepalive_timeout  65;
 
    server {
        listen       80;
        server_name  localhost;
 
        location / {
            root       /home/poetry-vue2;
            index      index.html;
            try_files  $uri $uri/ /index.html;
        }
 
        location /im {
            alias      /home/poetry-vue3;
            index      index.html;
            try_files  $uri $uri/ /index.html;
        }
 
        location /api/ {
            rewrite           ^/api/(.*)$ /$1 break;
            proxy_pass        http://127.0.0.1:8081;
            proxy_redirect    off;
            proxy_set_header  Host $host;
            proxy_set_header  X-real-ip $remote_addr;
            proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        }
 
        location /socket {
            proxy_pass          http://127.0.0.1:9324;
            proxy_http_version  1.1;
            proxy_set_header    Upgrade $http_upgrade;
            proxy_set_header    Connection "upgrade";
            proxy_read_timeout  600s;
        }
    }
}
```

文件服务配置示例：
```
在application.yml加入如下配置：

server:
  tomcat:
    # 请求体最大允许大小
    max-http-form-post-size: 35MB
 
spring:
  servlet:
    multipart:
      # 单个文件最大允许大小
      max-file-size: 30MB
      # 单个请求所有文件总和最大允许大小
      max-request-size: 30MB
 
store:
  # 默认存储平台
  type: qiniu
 
# 存储平台：服务器
local:
  # 开启服务器存储平台。使用哪个存储平台就配置哪个存储平台的参数，并开启此存储平台：enable: true。
  enable: true
  uploadUrl:
  downloadUrl:
 
# 存储平台：七牛云
qiniu:
  # 开启七牛云存储平台。使用哪个存储平台就配置哪个存储平台的参数，并开启此存储平台：enable: true。
  enable: true
  accessKey:
  secretKey:
  bucket:
  downloadUrl:


在nginx.conf加入如下配置：

# 禁止访问隐藏目录(.git/)和隐藏文件(.file)和遍历目录(../)
location ~ /\. {
    deny all;
    # 关闭相关的访问日志
    access_log off;
    # 关闭相关的错误日志
    log_not_found off;
}
 
location /static/ {
    # 静态文件存储的目录
    alias /home/file/;
    # 禁止目录列表
    autoindex off;
    # 设置防盗链
    valid_referers poetize.cn;
    if ($invalid_referer) {
        # 如果防盗链不通过，返回 403 禁止访问
        return 403;
    }
}

然后将文件上传到/home/file目录下访问即可。

例如有文件：/home/file/bg/bg.jpg
访问链接：https://poetize.cn/static/bg/bg.jpg
```

### 2023年1月1日更新
- 新增：音乐盒功能
- 新增：表白墙功能
- 优化：文件管理
- 优化：登录支持多端登录
- 优化：登录权限过期时间重置
- 优化：前端美化
- 优化：留言分类与资源整合

### 2023年4月1日更新
- 新增：百宝箱（收藏夹）
- 优化：首页
- 优化：前端美化
- 优化：资源整合

### 2023年7月20日更新
- 新增：旅拍模块
- 新增：看板娘
- 优化：聊天室脚本过滤
- 优化：每个IP和账号限制每天接口保存次数
- 优化：Bug修复

### 2023年8月20日更新
- 新增：访客统计（博客首页展示总访问量，后台管理系统首页展示IP/地区/用户维度的访问统计）
- 新增：搜索（标题与内容匹配。标题匹配放在上面，内容匹配放在下面。匹配多个标题或者多个内容时间倒叙排列）
- 新增：音乐按照列表顺序播放，列表中最后一首歌播放完后停止
- 新增：聊天室搜索功能（搜索框下的内容筛选）
- 新增：后台管理系统【欢迎光临】
- 优化：前端美化
- 优化：个别Bug修复

### 2023年9月1日更新：安全，安全，安全
- 优化：所有保存接口、邮件发送接口、文件上传接口都限制次数，防止恶意调用
- 优化：修复vuex中用户信息丢失错乱的Bug
- 优化：文件上传模块改造，每次上传之前获取上传密钥，每个密钥只能上传一个文件
- 优化：个别Bug修复

### 2023年10月1日更新
- 新增：文章加密
- 新增：文章订阅
- 新增：文件上传模块改造，支持多平台（目前对接本地）
- 优化：友人帐及其他模块样式调整

### 2024年1月10日更新
- 新增：首页分类预览
- 新增：文章视频
- 新增：文章目录
- 新增：留言与朋友圈图片放大
- 新增：上传进度条与原始文件名记录
- 优化：百宝箱及其他模块样式调整

### 首页
![首页](首页.jpg)

### 推荐
![推荐](推荐.jpg)

### 留言
![留言](留言.jpg)

### 树洞
![树洞](树洞.jpg)

### 朋友圈（时间线）
![朋友圈（时间线）](朋友圈（时间线）.jpg)

### 友链
![友链](友链.jpg)

### 聊天室
![聊天室](聊天室.jpg)

## 安装
```
npm install
```

## 启动
```
npm run serve
```

## 编译
```
npm run build
```

## 配置
全局搜索`$$$$`，配置邮箱、MySQL、访问路径等。

全局搜索`https://`，将图片资源替换成自己自定义的内容，提高网站美化度。

- 博客：https://gitee.com/littledokey/poetize-vue2.git
- 聊天室：https://gitee.com/littledokey/poetize-im-vue3.git
- 后端：https://gitee.com/littledokey/poetize.git
- 七牛云登录/注册地址（文件服务器，CDN）：https://s.qiniu.com/Mz6Z32

### Star
`Star`

`Star`

`Star`

注意：[poetize.cn](https://poetize.cn)，谢谢Star，为这个项目点赞。

## 开源不易，欢迎赞助这个项目，让这个项目越来越好
感谢您【V 29.9￥】支持该项目，您将获得：
1. 学习交流群
2. 在线答疑
3. 详细部署文档：[https://poetize.cn/article?id=26](https://poetize.cn/article?id=26)

如果需要，请联系作者【微信号：poetize-sara】

![个人名片](一只小毛驴.jpg)

## 欢迎关注作者B站
B站搜索用户【寻国记】，博客介绍与搭建教程简介。

【挑战最美博客！个人博客网站食用教程。这是一个 SpringBoot 与 Vue 的产物，在此公开，一起学习，共同成长。】
https://www.bilibili.com/video/BV1eM41167Ks/?share_source=copy_web
