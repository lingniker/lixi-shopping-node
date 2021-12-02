// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import LoginLog from 'App/Models/LoginLog'

export default class LoginLogsController {
  async getList ({ request, response }) {
    var users = await LoginLog.all()
    return {
      code: '1',
      massage: '成功',
      data: users.map((user) => user.toJSON())
    }
  }
}
