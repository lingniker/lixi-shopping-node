// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Administrator from 'App/Models/Administrator'


export default class AdministratorsController {
  async getList ({ request }) {
    var users =  await Administrator.all()
    return {
      code: '1',
      massage: '成功',
      data: users.map((user) => user.toJSON())
    }
  }
}
