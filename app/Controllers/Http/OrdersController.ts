// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Order from 'App/Models/Order'
export default class OrdersController {
  async getList ({ request, response }) {
    var orders = await Order.all()
    return {
      code: '1',
      massage: '成功',
      data: orders.map((order) => order.toJSON())
    }
  }
}
