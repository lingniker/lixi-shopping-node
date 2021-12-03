import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import OperLog from 'App/Models/OperLog'

export default class OperLog {
  public async handle({}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
    var requestJosn = JSON.parse(JSON.stringify(request))
    var obj = {}
    obj.user_name = requestJosn.body.user_name
    obj.ip = requestJosn.ip
    obj.login_massage = request.obj.massage
    obj.login_type = request.login_type
    obj.browser_type = getBrowserType(requestJosn.headers['user-agent'])
    obj.system = getSystem(requestJosn.headers['user-agent'])
    obj.query = requestJosn.query
    await OperLog.create(obj)
  }
}
