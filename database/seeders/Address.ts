import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Address from 'App/Models/Address'

export default class AddressSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await Address.createMany([
      {
        'address_name': '广东省深圳市',
        'user_id': '1',
        'shop_id': '1',
        'type': '1',
        'type_describe': '用户地址'
      },
      {
        'address_name': '广东省深圳市',
        'user_id': '1',
        'shop_id': '1',
        'type': '2',
        'type_describe': '商品地址'
      }
    ])
  }
}
