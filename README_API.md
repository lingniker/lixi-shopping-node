### 接口

### 1、请求地址

#### 请求URL:  
```sh 
  http://lingyuanpin.top:8035/api/address
```

#### 示例：

#### 请求方式: 
```
POST GET
```

#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|      |      | | |

#### 返回示例：

```javascript
  { 
    "code":"1",
    "massage":"成功",
    "data":[
      {
        "id":4,
        "address_name":"广东省深圳市",
        "user_id":"1",
        "shop_id":"1",
        "type":"2",
        "type_describe":"商品地址",
        "created_at":"2021-12-06T19:25:35.000+08:00",
        "updated_at":"2021-12-06T19:25:35.000+08:00"
      }
    ]
  }
```

### 2、管理员列表

#### 请求URL:  
```sh 
  http://lingyuanpin.top:8035/api/administrator
```

#### 示例：
```sh
http://lingyuanpin.top:8035/api/administrator?current_page=1&per_page=10&pageNum=1&user_id=1&user_name=admin&login_type=admin
```

#### 请求方式: 
```
POST GET
```

#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
| current_page | 是 | string | 当前页码 |
| per_page | 是 | string | 每页多少 |
| user_name | 是 | string | 用户名 |
| login_type | 是 | string | 登录方式 |

#### 返回示例：

```javascript
  {
    "code":"1",
    "massage":"获取商品列表成功",
    "data":{
      "meta":{
        "total":2,"per_page":10,"current_page":1,"last_page":1,"first_page":1,"first_page_url":"/?page=1","last_page_url":"/?page=1","next_page_url":null,"previous_page_url":null
      },
      "data":[
        {
          "id":2,"user_name":"ling","nick_name":"niker","mobile":"13878744444","email":"outlook","avatar":"ckwovbq2o00016ctoa5nt2nlq.jpg","password":"123456","money":"96681","address_name":"深圳","address_id":"1","created_at":"2021-12-06T19:23:04.000+08:00","updated_at":"2021-12-06T19:23:04.000+08:00"
        }
      ]
    }
  }
```

### 3、图片上传

#### 请求URL:  
```sh 
  http://lingyuanpin.top:8035/api/img-upload
```

#### 示例：

#### 请求方式: 
```
POST
```

#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|


#### 返回示例：

```javascript
    { name: coverImage }
```