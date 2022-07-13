// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Shop from 'App/Models/Shop'
export default class ShopsController {
  async getList ({ request, response }) {
    var query = request.all()
    var shops = null;
    var total = 0;
    if (query.shop_name) {
      shops = await Shop.query().where('shop_name', 'LIKE', '%'+query.shop_name+'%').orderBy('id', 'asc').paginate(query.current_page, 10)
      total = shops.length;
    } else {
      shops = await Shop.query().orderBy('id', 'desc').paginate(query.current_page ? query.current_page : 1, 10)
    }
    var obj = {
      code: '1',
      massage: '获取商品列表成功',
      data: shops
    }
    request.obj = obj
    request.login_type = query.login_type
    request.user_name = query.user_name
    request.user_id = query.user_id
    return obj
  }

  async create ({ request, response }) {
    var query = request.all()
    var shopObj = {
      "shop_name": query.shop_name,
      "img_path": query.img_path,
      "describe": query.describe,
      "stock": query.stock,
      "price": query.price,
      "sales_status": query.sales_status,
      "sales_status_label": query.sales_status_label,
      "address_name": query.address_name,
      "address_id": query.address_id,
      "sales_volume": 0,
    }
    var shop = await Shop.create(shopObj)

    var obj = {
      code: '1',
      massage: '新增商品成功',
      data: shop
    }
    request.obj = obj
    request.login_type = query.login_type
    request.user_name = query.user_name
    request.user_id = query.user_id
    return obj
  }

  async update ({ request, response }) {
    var query = request.all()
    var shopObj = {
      "shop_name": query.shop_name,
      "img_path": query.img_path,
      "describe": query.describe,
      "stock": query.stock,
      "price": query.price,
    }
    var shop = await Shop.query().where('id', query.id).update(shopObj)

    var obj = {
      code: '1',
      massage: '修改商品成功',
      data: shop
    }
    request.obj = obj
    request.login_type = query.login_type
    request.user_name = query.user_name
    request.user_id = query.user_id
    return obj
  }
}
