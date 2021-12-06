import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import OperLog from 'App/Models/OperLog'

import utils from '../../utils/index'

export default class OperLog {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
    var requestJosn = JSON.parse(JSON.stringify(request))
    var query = requestJosn.method === 'POST' ? JSON.stringify(requestJosn.body) : requestJosn.query
    var obj = {}
    obj.user_name = request.user_name
    obj.oper_massage = request.obj.massage
    obj.login_type = request.login_type === 'user' ? 'app访问' : '管理员'

    obj.ip = requestJosn.ip
    obj.browser_type = utils.getBrowserType(requestJosn.headers['user-agent'])
    obj.system = utils.getSystem(requestJosn.headers['user-agent'])
    obj.query = query

    obj.response = request.user_name
    await OperLog.create(obj)
  }
}
