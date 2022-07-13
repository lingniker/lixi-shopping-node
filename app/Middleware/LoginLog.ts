import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import LoginLog from 'App/Models/LoginLog'

import utils from '../../utils/index'

export default class LoginLog {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
    var requestJosn = JSON.parse(JSON.stringify(request))
    var query = requestJosn.method === 'POST' ? JSON.stringify(requestJosn.body) : requestJosn.query
    var obj = {}
    obj.user_name = requestJosn.body.user_name
    obj.ip = requestJosn.ip
    obj.login_massage = request.obj.massage
    obj.login_type = request.login_type
    obj.browser_type = utils.getBrowserType(requestJosn.headers['user-agent'])
    obj.system = utils.getSystem(requestJosn.headers['user-agent'])
    obj.query = query
    await LoginLog.create(obj)
  }
}
