import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Order from 'App/Models/Order'

export default class OrderSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await Order.createMany([
      {
        'user_id': '1',
        'user_name': 'ling',
        'user_address_id': '1',
        'user_address_name': '深圳',
        'shop_id': '9',
        'shop_name': '商品',
        'shop_img_path': 'aa.jpg',
        'shop_address_name': '商品地址',
        'shop_address_id': '2',
        'shop_number': '1',
        'shop_price': '100',
        'shop_price_total': '100',
        'order_status': '1',
        'order_label': '待付款', // 1待付款 2已付款
        'send_status': '1',
        'send_label': '待付款', // 1待付款  2待发货 3待收货 4完成订单
        // 'state': '1' // 1正常 2删除 3关闭
        // 'state_label': '正常'
      },
      {
        'user_id': '1',
        'user_name': 'ling',
        'user_address_id': '1',
        'user_address_name': '深圳',
        'shop_id': '9',
        'shop_name': '商品',
        'shop_img_path': 'aa.jpg',
        'shop_address_name': '商品地址',
        'shop_address_id': '2',
        'shop_number': '1',
        'shop_price': '100',
        'shop_price_total': '100',
        'order_status': '1',
        'order_label': '待付款', // 1待付款 2已付款
        'send_status': '1',
        'send_label': '待付款', // 1待付款  2待发货 3待收货 4完成订单
      },
    ])
  }
}
