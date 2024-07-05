## POETIZE
POETIZE：作诗，有诗意地描写。

![首页](poetize_picture/首页.png)

## Star
ps: 虽然我知道，大部分人都是来了直接下载源代码后就潇洒的离开。

虽然我知道现实就是如此的残酷，但我还是要以我萤虫之力对各位到来的同仁发出一声诚挚的嘶吼：`Star`，`Star`，`Star`。

相信各位同仁看到下面的项目介绍一定会心动的，心想`怎么没有早点遇到这么漂亮的博客项目`。在搭建这个美丽的网站同时，何不`Star`，为这个项目点赞呢！

## 技术栈
这是一个 SpringBoot + Vue2 + Vue3 的产物，支持移动端自适应，配有完备的前台和后台管理功能。

前端技术：Vue2（博客系统），Vue3（IM 聊天室系统），Element UI（Vue2），Element-Plus UI（Vue3），Naive UI（Vue3）

后端技术：Java，SpringBoot，MySQL，Mybatis-Plus，t-io，qiniu-java-sdk，spring-boot-starter-mail

网站分两个模块：
- 博客系统：具有文章，表白墙，图片墙，收藏夹，乐曲，视频播放，留言，友链，时间线，后台管理等功能。
- 聊天室系统：具有朋友圈（时间线），好友，群等功能。

本网站采用前后端分离进行实现，两个前端项目通过Nginx代理，后端使用Java。

部署网站需要安装Nginx、Java、MySQL，然后打包前后端项目并部署。

文件服务可以使用七牛云，也可以使用服务器。默认使用服务器。

Vue3（IM 聊天室系统）是非必须的。如果部署，则需要依赖博客，然后从博客的“联系我”进入，因为登录模块在博客。

## 项目地址
- 博客前端（开源版）：https://gitee.com/littledokey/poetize-vue2.git
- 聊天室前端（开源版）：https://gitee.com/littledokey/poetize-im-vue3.git
- 后端（开源版）：https://gitee.com/littledokey/poetize-server.git
- 博客前端、聊天室前端、后端汇总版（上述三个仓库放在一个仓库里，代码无差别）（开源版）：https://gitee.com/littledokey/poetize
- 七牛云登录/注册地址（文件服务/CDN）：https://s.qiniu.com/Mz6Z32

## 本地启动
Vue2：
1. npm install
2. npm run serve

Vue3：
1. npm install
2. npm run serve

SpringBoot：
1. 导入SQL文件到数据库（poetry.sql）
2. 配置数据库连接（application.yml里面的datasource信息）
3. 启动（PoetryApplication）

## 项目介绍
大家好，我是Sara。POETIZE已经3年了。

从2021年6月16日开始搭建项目，到2022年8月21日第一个版本发布。期间曾因为换工作而暂停几个月，也因老头环而鸽了几个月。

项目经历了大大小小的更新，每次更新都是在美观度上的精雕细琢，也修复了很多问题，添加了很多功能。

项目提供部分源码供大家参考学习，只需要在Gitee拉取项目，按照Readme启动说明就能直接启动，但需要一定的编程能力。完整版就需要您赞助本项目了。

感谢对POETIZE的支持。

## 完整版
[官网完整版：https://poetize.cn](https://poetize.cn)

[购买请移步：https://poetize.cn/article/20](https://poetize.cn/article/20)

[完整版测试网站：http://zuimei.live](http://zuimei.live)，用户名Abby，密码：5201314（请勿搞破坏）。

[POETIZE - 文档导航与网站美化](https://poetize.cn/article/100)

部署专栏：[POETIZE - 部署专栏](https://poetize.cn/label/30)

使用指南专栏：[POETIZE - 使用指南专栏](https://poetize.cn/label/31)

### 完整版特色
在开源版的基础上持续更新与优化，极致美学设计，实用与美观并存，丰富且强大的文章系统，致力于成为最美博客与最美内容平台。

#### 多首页

##### 经典超美博客首页
![首页1](poetize_picture/首页1.jpg)

##### 文章首页
![首页2](poetize_picture/首页2.jpg)

##### 专栏首页
![首页3](poetize_picture/首页3.jpg)

##### 极简起始页
![首页4](poetize_picture/首页4.jpg)

#### 专栏文章
![专栏](poetize_picture/专栏.jpg)

## 开源版

### 博客

#### 文章速览、文章分类
![首页文章速览](poetize_picture/首页文章速览.png)

![分类页面](poetize_picture/分类页面.png)

#### 文章详情页：文章、视频功能与留言
![文章详情页](poetize_picture/文章详情页.png)

![文章视频功能](poetize_picture/文章视频功能.png)

![文章留言区域](poetize_picture/文章留言区域.png)

#### 恋爱笔记与旅拍
![恋爱笔记页面](poetize_picture/恋爱笔记页面.png)

![旅拍页面](poetize_picture/旅拍页面.png)

#### 百宝箱、弹幕墙与友人帐
![百宝箱](poetize_picture/百宝箱.png)

![弹幕墙](poetize_picture/弹幕墙.png)

![友人帐](poetize_picture/友人帐.png)

#### 聊天室与朋友圈
![聊天室](poetize_picture/聊天室.png)

![朋友圈](poetize_picture/朋友圈.png)

### 后台管理系统

#### 访问统计、基础设置与文件管理
![后台管理访问统计](poetize_picture/后台管理访问统计.png)

![后台管理网站基础设置](poetize_picture/后台管理网站基础设置.png)

![后台管理文件资源管理](poetize_picture/后台管理文件资源管理.png)

#### 文章管理与新增文章
![后台管理文章管理](poetize_picture/后台管理文章管理.png)

![后台管理新增文章](poetize_picture/后台管理新增文章.png)

## 开源版更新进度

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

### 2023年9月1日更新
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

### 2024年4月1日更新
- 部署优化，提取配置文件到MySQL，无需编译打包环节
- 前端编译压缩，提升访问速度
- 部分样式美化

### 2024年4月10日更新
- 部署优化
- 后端增加系统配置模块
- 部分样式美化
