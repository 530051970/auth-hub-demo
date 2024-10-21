# 多OIDC共存的身份认证脚手架

[English](README.md) | 简体中文

在长期的solution开发以及guidance构建过程中，发现有一些不影响关键业务的问题，但影响工作效率，拉低了用户体验，在身份认证模块尤其突出，具体表现为：
- 重复造轮子 每一个guidance都需要，但每次都花至少一个sprint的时间来处理用户的身份认证
- 多OIDC认证不能共存  比如新增加对Authing的支持需要把原来的cognito相关的代码注释掉重新发版
- 用户体验不佳 现有的解决方案在用户登录的时候会出现多次跳转，影响用户体验

## Table of Contents

- [开始](#getting-started)
  - [架构](#architecture)
  - [安装](#installation)
  - [使用](#usage)
- [特征](#features)
- [贡献](#contributing)
- [使用许可](#license)

## 开始

本文档旨在介绍一种可以一劳永逸的解决上述问题的还能高度DIY的脚手架，争取能在今后的工作中被用上。

### 架构

![architecture](/source/app/public/imgs/architecture.png)


### 方案展示
OIDC登录
![demo](/source/app/public/imgs/demo.png)
创建账号
![register](/source/app/public/imgs/register.png)
找回密码
![findPW](/source/app/public/imgs/findPwd.png)
主页
![home](/source/app/public/imgs/home.png)

链接：https://deu59wuttwjgy.cloudfront.net 
    （Authing：用户名和密码均为demo）

### 如何使用
#### 文档结构
该脚手架的内部组织如下，开发者在使用过程中只需要根据业务需要修改红色部分文件即可。
```bash
Auth Hub Demo
├── LICENSE
├── bin
│   └── auth-hub-demo.ts                      ......... 入口  
├── lib
│   └── auth-hub
│   │   └── lambda
│   │   │   ├── auth_api.py                   ......... 认证用API
│   │   │   ├── authorizer.py                 ......... 认证用API-Authorizer(恒真)
│   │   │   ├── config.yaml                   ......... 维护clientID和Secret之间的映射
│   │   │   └── requirements.txt
│   │   └── index.ts                          ......... Authentication Stack
│   ├── auth-hub-demo-stack.ts                ......... Business Stack
│   └── constant.ts
├── source
│   ├── api
│   │   ├── authorizer.py                     ......... 业务用API-Authorizer（Token校验）
│   │   ├── biz_api.py                        ......... Business API                          
│   │   └── requirements.txt
│   └── app
│       ├── Dockerfile
│       ├── README.md
│       ├── public
│       │   ├── imgs
│       │   ├── locales
│       │   ├── auth.json
│       │   └── config.yaml                   ......... 通过此文件自定义登录方式及展现方式
│       ├── src
│       │   ├── App.test.tsx
│       │   ├── App.tsx
│       │   ├── common
│       │   │   └── constants.ts
│       │   ├── context
│       │   │   ├── config-context.tsx
│       │   │   └── config-provider.tsx
│       │   ├── enum
│       │   │   └── common_types.ts
│       │   ├── i18n.ts
│       │   ├── index.scss
│       │   ├── index.tsx
│       │   ├── pages
│       │   │   ├── change-pwd                ......... 修改密码 
│       │   │   ├── find-pwd                  ......... 查找密码
│       │   │   ├── login                     ......... 登录
│       │   │   ├── no-access
│       │   │   ├── register                  ......... 创建账号
│       │   │   └── biz-page                  ......... Business API 
│       │   ├── react-app-env.d.ts
│       │   ├── reportWebVitals.ts
│       │   ├── request
│       │   ├── routers
│       │   ├── secure
│       │   ├── setupTests.ts
│       │   ├── tools
│       │   └── ts
│       └── tsconfig.json
├── customise.sh
└── tsconfig.json
```

#### 方案部署
要部署该脚手架，请按照以下步骤操作：

步骤 1: 克隆 GitHub 仓库
```bash
cd ~
git clone https://github.com/530051970/auth-hub-demo.git
```

步骤 2: 替换包名和栈名

包名：一般用于自定义目录名称，通常是小写字母，多个小写字母之间用-连接，比如：ai-tool-kit
栈名:   一般用于自定义部署的栈名，创建的资源通常以栈作为前缀，一般是首字母大写的词组成比如：AiToolKit
```bash
cd auth-hub-demo
./customize.sh 包名 stack名
```

步骤 3: 在编辑器中打开配置文件自定义登录信息
前端：source/app/public/config.yaml
```bash
project: "Auth Hub Demo"                               
version: "0.0.1"
author: "IndustryBuilders Team"
login:
  user: 
    label: "Username"
    value: "username"
    disabled: true
  sns: 
    label: "SNS Code"
    value: "sns"
    disabled: true
  oidc:
    label: "OIDC"
    value: "oidc"
    providers:
      - name: "Authing"
        iconUrl: "authing"
        description: "Authentication service for ensuring application security"
        clientId: "66b769cf5c2d439dfd37f237"
        redirectUri: "https://demo-center.authing.cn"
        issuer: ""
        audience: ""
      - name: "Keycloak"
        iconUrl: "keycloak"
        description: "Open Source Identity and Access Management"
        clientId: "668d3fa8e264cf3675dcc42a"
        redirectUri: "https://intelli-agent.authing.cn"
        diabled: true
  third:
    - type: "google"
      iconUrlSelected: "google_in"
      iconUrl: "google"
      iconStyle: {"width":39,"marginTop":-2}
    - type: "facebook"
      iconUrlSelected: "facebook_in"
      iconUrl: "facebook"
      iconStyle: {"width":34}
    - type: "linkedin"
      iconUrlSelected: "linkedin_in"
      iconUrl: "linkedin"
      iconStyle: {"width":35}
```
后端：lib/auth-hub/config.yaml
```bash
oidc_providers:
  authing:
    clients:
      - client_id: 66b769cf5c2d439dfd37f237
        client_secret: 7dab7e589bf215fa8778609c54d90f9c
  keycloak:
    clients:
      - client_id: 6fsdfdsdddddsadsf434ssd3
        client_secret: fasded3442324dfsd8632sddsa
```

步骤5:  部署stack
1. 默认自带cogonito
```bash
npm i
npx cdk deploy 
```
2. 不需要部署cognito
```bash
npm i
npx cdk deploy --parameters cogonito=false
```
4.3 内置APIs
|路径     |请求方式|参数       |含义      ｜
| :----- | ---:  | :------: | :------: |
|/login  | post  | -        | 登录      |
|/auth/token/refresh|post|-|刷新令牌|
|/auth/change-pwd|post|-|修改密码|
|/auth/create-account|post|-|新增账号|

### 使用许可
该项目根据 Apache 许可证 2.0 版获得许可 - 有关详细信息，请参见 [LICENSE](http://www.apache.org/licenses/) 文件。
