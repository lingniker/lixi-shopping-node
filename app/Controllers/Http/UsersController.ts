// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  async getList ({ request }) {
    var users =  await User.all()
    return {
      code: '1',
      massage: '成功',
      data: users.map((user) => user.toJSON())
    }
  }
}