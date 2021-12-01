// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class LoginController {
  async user({request,req}){
    var query = request.all()
    var data = await User.findBy('userName', query.username)
    if (!data) {
      return {
        code: '2',
        massage: '账户不存在',
        data: data
      }
    } else {
      if(data.password !== query.password) {
        return {
          code: '3',
          massage: '密码错误',
          data: null
        }
      } else {
        return {
          code: '1',
          massage: '成功',
          data: data
        }
      }
    }
  }
}
