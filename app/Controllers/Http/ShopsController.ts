// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Shop from 'App/Models/Shop'
export default class ShopsController {
  async getList ({ request, response }) {
    var shops = await Shop.all()
    return {
      code: '1',
      massage: '成功',
      data: {
        row: shops.map((shop) => shop.toJSON())
        total: 100,
        page: 1,
        page_size: 10
      }
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
}
