// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Order from 'App/Models/Order'
import User from 'App/Models/User'
import Shop from 'App/Models/Shop'
import Database from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'

import Logistic from '@ioc:Adonis/Logistic'; // 物流

import Transaction from "../../../utils/Transaction";

export default class OrdersController {
  async getList ({ request, response }) {
    var query = request.all()
    var data = []
    // console.log('Application.abcd---->', Application.abcd)
    if (query._user_id) {
      data = await Order.query()
      .where('user_id', query._user_id).orderBy('id', 'desc').paginate(1, 100)
    } else if (query.shop_name) {
      data = await Order.query()
      .where('shop_name', 'LIKE', '%'+ query.shop_name +'%').orderBy('id', 'desc').paginate(query.current_page, 10)
    } else {
      data = await Order.query().orderBy('id', 'desc').paginate(query.current_page, 10)
    }
    return {
      code: '1',
      massage: '成功',
      data: data
    }
  }

  async create ({ request, response }) {
    var query = request.all()
    var obj = {
      'user_id': query.user_id,
      'user_name': query.user_name,
      'user_address_id': query.user_address_id,
      'user_address_name': query.user_address_name,
      'shop_id': query.shop_id,
      'shop_name': query.shop_name,
      'shop_address_name': query.shop_address_name,
      'shop_address_id': query.shop_address_id,
      'shop_number': query.shop_number,
      'shop_price': query.shop_price,
      'shop_price_total': query.shop_price_total,
      'shop_img_path': query.shop_img_path,
      'order_status': '1',
      'order_label': '待付款', // 1待付款 2已付款
      'send_status': '1',
      'send_label': '待付款', // 1待付款  2待发货 3待收货 4完成订单
    }
    var orders = await Order.create(obj)
    var obj = {
      code: '1',
      massage: '创建订单成功',
      data: orders
    }
    request.obj = obj
    request.login_type = query.login_type
    request.user_name = query.user_name
    request.user_id = query.user_id
    return obj
  }

  async pay ({ request, response }) {
    var query = request.all()
    // console.log('query', query)
    var user = await User.findBy('id', query.user_id)
    var order = await Order.findBy('id', query.id)
    var shop = await Shop.findBy('id', query.shop_id)
    var trx = 'databaseTrx' + query.user_id + query.id + new Date().getTime()

    // var Transaction = new Transaction(order , Logistic);
    // Transaction.prepare(); // 事务的准备阶段
    // if (Transaction.state === '2') { // 事务已经准备好
    //   Transaction.commit() // 事务准备提交
    //   if (Transaction.state === '4') {
    //    console.log('事务提交成功')
    //   }
    // } else {
    //   Transaction.rollback() // 事务回滚
    // }
    
    // class order = {
    //   constructor (app) {
    //     this.state = '0'
    //   }
    //   public prepare () {

    //   }
    //   public commit () {}
    //   public rollback () {}
    // }

    Application[trx] = await Database.transaction() // 创建事务

    var shop_number = shop.stock - query.shop_number
    if (shop_number >= 0) { // 判断商品数量是否充足
      var userMoney = user.money - query.shop_price_total
      if (userMoney >= 0) { // 判断用户余额是否充足
        try {
          await User
            .query({ client: Application[trx] })
            .where('id', query.user_id)
            .update({ money: userMoney })
          await Shop
            .query({ client: Application[trx] })
            .where('id', query.shop_id)
            .update({ stock: shop_number, sales_volume: parseInt(shop.sales_volume) + parseInt(query.shop_number) })
          await Order
            .query({ client: Application[trx] })
            .where('id', query.id)
            .update({ order_status: '2', order_label: '已付款', send_status: '2', send_label: '待发货' })
          await Logistic.post() // 创建物流事务
          if (Logistic.state === 2) { // 物流事务创建状态正常
            await Application[trx].commit() // 事务提交
            user.money = userMoney
            var obj = {
              code: '1',
              massage: '支付成功',
              data: user
            }
            request.obj = obj
            request.login_type = query.login_type
            request.user_name = query.user_name
            request.user_id = query.user_id
            return obj
          } else {
            await Application[trx].rollback() // 订单事务回滚
            user.money = userMoney
            var obj = {
              code: '1',
              massage: '支付失败',
              data: user
            }
            request.obj = obj
            request.login_type = query.login_type
            request.user_name = query.user_name
            request.user_id = query.user_id
            return obj
          }
        } catch (error) {
          await Application.databaseTrx.rollback() // 订单事务回滚
          user.money = userMoney
          var obj = {
            code: '1',
            massage: '支付失败',
            data: user
          }
          request.obj = obj
          request.login_type = query.login_type
          request.user_name = query.user_name
          request.user_id = query.user_id
          return obj
        }
      } else {
        var obj = {
          code: '1',
          massage: '用户余额不足'
        }
        request.obj = obj
        request.login_type = query.login_type
        request.user_name = query.user_name
        request.user_id = query.user_id
        return obj
      }
    } else {
      var obj = {
        code: '1',
        massage: '商品库存不足'
      }
      request.obj = obj
      request.login_type = query.login_type
      request.user_name = query.user_name
      request.user_id = query.user_id
      return obj
    }
    var obj = {
      code: '1',
      massage: '下单成功'
    }
    request.obj = obj
    request.login_type = query.login_type
    request.user_name = query.user_name
    request.user_id = query.user_id
    return obj
  }

  async update ({ request, response }) {
    var query = request.all()
    var order = await Order.findBy('id', query.id)
    const trx = await Database.transaction() // 创建事务

    if (query.send_status === '2') {
      try {
        var logistic = await logistic(query)
        var data = await Order
          .query({client: trx })
          .where('id', query.id)
          .update({ send_status: '3', send_label: '待收货' })
        await logistic.commit()
        await trx.commit() // 事务提交
      } catch (error) {
        logistic.rollback() // 物流事务回滚
        await trx.rollback() // 事务回滚
      }
      


      var obj = {
        code: '1',
        massage: '状态更新成功,待发货->待收货',
        data: data
      }
      request.obj = obj
      request.login_type = query.login_type
      request.user_name = query.user_name
      request.user_id = query.user_id
      return obj
    } else if (query.send_status === '3') {
      var data = await Order
        .query()
        .where('id', query.id)
        .update({ send_status: '4', send_label: '订单完成' })
      var obj = {
        code: '1',
        massage: '状态更新成功,待收货->订单完成',
        data: data
      }
      request.obj = obj
      request.login_type = query.login_type
      request.user_name = query.user_name
      request.user_id = query.user_id
      return obj
    }
  }
}
