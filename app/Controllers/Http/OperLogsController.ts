// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import OperLog from 'App/Models/OperLog'

export default class OperLogsController {
  async getList ({ request, response }) {
    var query = request.all()
    var operLogs = null;
    var total = 0;
    if (query._user_name) {
      operLogs = await OperLog.query().where('user_name', 'LIKE', '%'+query._user_name+'%').orderBy('id', 'desc').paginate(query.current_page, 10)
      total = operLogs.length;
    } else {
      operLogs = await OperLog.query().orderBy('id', 'desc').paginate(query.current_page ? query.current_page : 1, 10)
    }
    var obj = {
      code: '1',
      massage: '获取操作日记成功',
      data: operLogs
    }
    return obj
  }
}
