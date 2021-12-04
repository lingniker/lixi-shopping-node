// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Order from 'App/Models/Order'
import User from 'App/Models/User'
import Shop from 'App/Models/Shop'
export default class OrdersController {
  async getList ({ request, response }) {
    var query = request.all()
    var data = []
    if (query.user_id) {
      // data = await Order.findBy('user_id', query.user_id)
      data = await Order.query()
      .where('user_id', query.user_id)
    } else {
      var orders = await Order.all()
      data = orders.map((order) => order.toJSON())
    }
    return {
      code: '1',
      massage: '成功',
      data: {
        page: 1,
        pageSize: 10,
        total: 10,
        row: data
      }
    }
  }

  async create ({ request, response }) {
    var query = request.all()
    query.order_status = '1'
    query.order_label = '待付款' // 1待付款 2已付款
    query.send_status = '1'
    query.send_label = '待付款'
    var orders = await Order.create(query)
    return {
      code: '1',
      massage: '下单成功',
      data: orders
      // data: orders.map((order) => order.toJSON())
    }
  }

  async pay ({ request, response }) {
    var query = request.all()
    // console.log('query', query)
    var user = await User.findBy('id', query.user_id)
    var order = await Order.findBy('id', query.id)
    var shop = await Shop.findBy('id', query.shop_id)


    var shop_number = shop.stock - query.shop_number
    if (shop_number >= 0) { // 判断商品数量是否充足
      var userMoney = user.money - query.shop_price_total
      if (userMoney >= 0) { // 判断用户余额是否充足
        await User
          .query()
          .where('id', query.user_id)
          .update({ money: userMoney })
        await Shop
          .query()
          .where('id', query.shop_id)
          .update({ stock: shop_number, sales_volume: parseInt(shop.sales_volume) + query.shop_number })
        await Order
          .query()
          .where('id', query.id)
          .update({ order_status: '2', order_label: '已付款', send_status: '2', send_label: '待发货' })
        return {
            code: "1",
            massage: '支付成功'
          }
      } else {
        return {
          code: "1",
          massage: '用户余额不足'
        }
      }
    } else {
      return {
        code: "1",
        massage: '商品库存不足'
      }
    }
    User.query().where('id', 1).update({ last_login_at: new Date() })




    return {
      code: '1',
      massage: '下单成功',
      // data: orders
      // data: orders.map((order) => order.toJSON())
    }
  }
}
