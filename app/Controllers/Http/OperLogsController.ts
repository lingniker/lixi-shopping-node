// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import OperLog from 'App/Models/OperLog'

export default class OperLogsController {
  async getList ({ request, response }) {
    var operLogs = await OperLog.all()
    return {
      code: '1',
      massage: '成功',
      data: operLogs.map((operLog) => operLog.toJSON())
    }
  }
}
