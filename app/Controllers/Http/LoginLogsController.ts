// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import LoginLog from 'App/Models/LoginLog'

export default class LoginLogsController {
  async getList ({ request, response }) {
    var query = request.all()
    var loginLogs = null;
    if (query._user_name) {
      loginLogs = await LoginLog.query().where('user_name', 'LIKE', '%'+query._user_name+'%').orderBy('id', 'desc').paginate(query.current_page, 10)
    } else {
      loginLogs = await LoginLog.query().orderBy('id', 'desc').paginate(query.current_page ? query.current_page : 1, 10)
    }
    var obj = {
      code: '1',
      massage: '获取登录日记成功',
      data: loginLogs
    }
    return obj
  }
}
