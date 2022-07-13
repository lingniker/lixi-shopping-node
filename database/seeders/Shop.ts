import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Shop from 'App/Models/Shop'

export default class ShopSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await Shop.createMany([
      {
        'shop_name': '美食',
        'img_path': 'ckwovbq2o00016ctoa5nt2nlq.jpg',
        'describe': '美味的食品',
        'stock': '100',
        'sales_volume': '9',
        'sales_status': '1',
        'sales_status_label': '在售',
        'price': '80',
        'address_name': '深圳',
        'address_id': '1'
      },
      {
        'shop_name': '美食2',
        'img_path': 'ckwovbq2o00016ctoa5nt2nlq.jpg',
        'describe': '美味的食品2',
        'stock': '100',
        'sales_volume': '9',
        'sales_status': '1',
        'sales_status_label': '在售',
        'price': '80',
        'address_name': '深圳',
        'address_id': '1'
      }
    ])

  }
}
