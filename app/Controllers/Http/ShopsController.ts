// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Shop from 'App/Models/Shop'
export default class ShopsController {
  async getList ({ request, response }) {
    var query = request.all()
    var shops = null;
    var total = 0;
    if (query.shop_name) {
      shops = await Shop.query().where('shop_name', 'LIKE', '%'+query.shop_name+'%').paginate(1,10)
      total = shops.length;
    } else {
      // var shops1 = await Shop.query()
      // total = shops1.length;
      shops = await Shop.query().paginate(1,10)
      // shops
    }
    return {
      code: '1',
      massage: '成功',
      data: shops
    }
  }

  async create ({ request, response }) {
    var query = request.all()
    var shop = await Shop.create(query)
    return {
      code: '1',
      massage: '创建成功',
      data: shop
    }
  }

  async update ({ request, response }) {
    var query = request.all()
    // var shop = await Shop.create(query)
    return {
      code: '1',
      massage: '修改成功',
      // data: shop
    }
  }
}
