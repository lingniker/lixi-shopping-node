### 后台管理

####  adonis + mysql 

### 创建项目 lixi-shopping-node 并启动

```sh
  npm init adonis-ts-app@latest lixi-shopping-node
  cd lixi-shopping-node
  npm run dev
```

### 1.数据库的连接

```sh
  ## 安装数据库相关的包
  npm i @adonisjs/lucid
  ## 配置数据库
  node ace configure @adonisjs/lucid
```

#### 修改 .evn 
```js
PORT=8035
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=gU6_9re9gZyMd_wArJMOalIQ3-mHQOa1
DRIVE_DISK=local
DB_CONNECTION=mysql // 连接方式
MYSQL_HOST=localhost // 连接地址
MYSQL_PORT=3306 // 连接端口
MYSQL_USER=root // 连接用户
MYSQL_PASSWORD=123456 // 连接密码
MYSQL_DB_NAME=shopping // 连接数据库
```

### 2.配置路由 

```js
  // start\routes.ts 文件按下 新增路由 
  // 要在文件下有对应的文件 app/Routes/login
  import 'App/Routes/login'
  import 'App/Routes/login-log'
  import 'App/Routes/user'
  import 'App/Routes/administrator'
  import 'App/Routes/img-uplosd'
  import 'App/Routes/shop'
  import 'App/Routes/address'
  import 'App/Routes/order'
  import 'App/Routes/oper-log'
```

### 3.控制器

```js
  // 创建控制器
  node ace make:controller User
  // 会生成 app/Controllers/Http/UsersController.ts
```

#### 路由与控制器关联

```js
  import Route from '@ioc:Adonis/Core/Route'
  // 访问 /api/user , 会执行 app/Controllers/Http/UsersController.ts 的代码
  Route.get('/api/user', "UsersController.getList")
```

### 4.数据模型
```sh
  ## 创建数库模型 
  node ace make:model -m
```

### 5.控制器与数据库

```js
import User from 'App/Models/User'

export default class UsersController {
  async getList ({ request, response }) {
    var users = await User.all()
    return {
      code: '1',
      massage: '成功',
      data: users.map((user) => user.toJSON())
    }
  }
}
```

### 6.中间件
```sh
  ## 创建中间件
  node ace make:middleware LoginLog
```

#### 定义全局变量 start\kernel.ts
```js
  Server.middleware.registerNamed({
    LoginLog: () => import('App/Middleware/LoginLog')
    OperLog: () => import('App/Middleware/OperLog')
  })
```

#### 使用中间件
```js
  import Route from '@ioc:Adonis/Core/Route'
  // 在请求的过程中加入中间件
  Route.get('/api/login', "LoginController.user").middleware("LoginLog");
```

### 7.数据库 migration 迁移模型

```sh 
  ## 迁移模型
  node ace make:migration user

  ### 生成迁移模板 database\migrations\1638508418251_users.ts

  ### 模板生成 数据库会创建表
  node ace migration:run
```

### 8.数据库 seeder 模板数据

```sh
  node ace make:seeder user
  ## 生成模板文件 database\seeders\User.ts
```

```sh
  ## 数据库生成数据
  node ace db:seed
```

### 9.图片上传
```js
  const coverImage = request.file('file') // 获取上传文件对象
  if (coverImage) {
    await coverImage.moveToDisk('./') // 写入硬盘中
  }
```

#### 驱动配置 config\drive.ts
```js
  root: path.join(__dirname,'../public/img') // 最终上传的本地路径
```


### 数据库的设计

#### Address 地址

| 字段 |名称 | 说明 |
| --- | --- | --- |
| id | id | 主键 |
| address_name | 地址名称 |  |
| user_id | 用户id | 关联的用户 |
| shop_id | 商品id | 关联的商品 |
| type | 类型 | 是关联商品还是用户: user shop  |
| type_describe | 类型描述 | 描述 用户地址 商品地址 |
| createdAt | 创建时间 | 创建数据自动生成 |
| updatedAt | 更新时间 | 更新数据自动更新 |

#### Administrator 管理员

| 字段 |名称 | 类型 | 说明 | 
| --- | --- | --- | --- |
| id | id | number | 主键 |
| user_name | 用户名称 | string | 唯一 |
| nick_name | 用户昵称 | string |  |
| mobile | 手机号码 | string |  |
| email | 邮箱地址 | string | |
| avatar | 头像 | string | |
| password | 密码 | string | |
| createdAt | 创建时间 | DateTime | 创建数据自动生成 |
| updatedAt | 更新时间 | DateTime | 更新数据自动更新 |

#### LoginLog 登录信息

| 字段 |名称 | 类型 | 说明 |  
| --- | --- | --- | --- |
| id | id | number | 主键 |
| user_name | 用户名称 | string |  |
| ip | 登录ip | string |  |
| login_massage | 登录信息 | string |  |
| login_type | 登录类型 | string | 用户登录还是管理员登录 |
| browser_type | 浏览器类型 | string | |
| system | 登录的系统 | string | |
| query | 请求参数 | string | |
| createdAt | 创建时间 | DateTime | 创建数据自动生成 |
| updatedAt | 更新时间 | DateTime | 更新数据自动更新 |

#### OperLog 操作信息

| 字段 |名称 | 类型 | 说明 |  
| --- | --- | --- | --- |
| id | id | number | 主键 |
| user_name | 用户名称 | string |  |
| ip | 登录ip | string |  |
| oper_massage | 操作信息 | string |  |
| login_type | 登录类型 | string | 用户登录还是管理员登录 |
| browser_type | 浏览器类型 | string | |
| system | 登录的系统 | string | |
| query | 请求参数 | string | |
| response | 响应数据 | string | |
| createdAt | 创建时间 | DateTime | 创建数据自动生成 |
| updatedAt | 更新时间 | DateTime | 更新数据自动更新 |


### Order 订单信息

| 字段 |名称 | 类型 | 说明 |  
| --- | --- | --- | --- |
| id | id | number | 主键 |
| user_id | 用户id | string |  |
| user_name | 用户名称 | string |  |
| user_address_id | 用户地址id | string |  |
| user_address_name | 用户名称 | string | 收货地址  |
| shop_id | 商品ip | string |  |
| shop_name | 商品名称 | string |  |
| shop_img_path | 商品图片路径 | string |  |
| shop_address_name | 商品地址 | string | 发货地址 |
| shop_address_id | 商品地址id | string | |
| shop_number | 商品数量 | string | |
| shop_price | 商品价格 | string | |
| shop_price_total | 商品总价 | string | |
| order_status | 订单状态 | string | 1待付款 2已付款|
| order_label | 订单标签 | string | 1待付款 2已付款|
| send_status | 发货状态 | string | 1待付款 2待发货 3待收货 4订单完成 |
| send_label | 发货标签 | string | 1待付款 2待发货 3待收货 4订单完成 |
| createdAt | 创建时间 | DateTime | 创建数据自动生成 |
| updatedAt | 更新时间 | DateTime | 更新数据自动更新 |

### shop 商品信息

| 字段 |名称 | 类型 | 说明 |  
| --- | --- | --- | --- |
| id | id | number | 主键 |
| shop_name | 商品名称 | string |  |
| img_path | 商品图片 | string |  |
| describe | 商品描述 | string |  |
| stock | 库存 | string |  |
| sales_volume | 商品销量 | string |  |
| sales_status | 商品销售状态 | string | 1在售 2下架 3删除 |
| sales_status_label | 商品销售标签 | string | 1在售 2下架 3删除 |
| price | 商品价格 | string | |
| address_name | 商品地址 | string | 发货地址 |
| address_id | 商品地址id | string | |
| createdAt | 创建时间 | DateTime | 创建数据自动生成 |
| updatedAt | 更新时间 | DateTime | 更新数据自动更新 |

#### user 用户

| 字段 |名称 | 类型 | 说明 | 
| --- | --- | --- | --- |
| id | id | number | 主键 |
| user_name | 用户名称 | string | 唯一 |
| nick_name | 用户昵称 | string |  |
| mobile | 手机号码 | string |  |
| email | 邮箱地址 | string | |
| avatar | 头像 | string | |
| password | 密码 | string | |
| money | 金钱 | string | |
| address_name | 用户地址 | string | |
| address_id | 用户地址id | string | |
| createdAt | 创建时间 | DateTime | 创建数据自动生成 |
| updatedAt | 更新时间 | DateTime | 更新数据自动更新 |


### 目录结构

```sh
  |- app ------------------------------- 应用
    |- Controllers --------------------- 控制器
      |- Http 
        |- AddressesController --------- 地址控制器
        |- AdministratorsController ---- 管理员控制器
        |- LoginController ------------- 登录控制器
        |- LoginLogsController --------- 登录记录控制器
        |- OperLogsController ---------- 操作记录控制器
        |- OrdersController ------------ 订单控制器
        |- ShopsController ------------- 商品控制器
        |- UsersController ------------- 用户控制器
  |- Middleware
    |- LoginLog ------------------------ 用户日记中间件
    |- OperLog ------------------------- 操作日记中间件
  |- Models
    |- Address ------------------------- 地址模型
    |- Administrator ------------------- 用户模型
    |- LoginLog ------------------------ 登录日记模型
    |- Order --------------------------- 订单模型
    |- Shop ---------------------------- 商品模型
    |- User ---------------------------- 用户模型
  |- Routes
    |- address ------------------------- 地址路由
    |- administrator ------------------- 管理者路由
    |- img-uplosd ---------------------- 图片上传路由
    |- login-log ----------------------- 登录日记路由
    |- login --------------------------- 登录路由
    |- oper-log ------------------------ 操作日记路由
    |- order --------------------------- 订单路由
    |- shop ---------------------------- 商品路由
    |- user ---------------------------- 用户路由
```