// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Address from 'App/Models/Address'

export default class AddressesController {
  async getList ({ request, response }) {
    var addresses = await Address.all()
    return {
      code: '1',
      massage: '成功',
      data: addresses.map((address) => address.toJSON())
    }
  }
}
