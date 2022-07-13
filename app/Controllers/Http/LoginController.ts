// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Administrator from 'App/Models/Administrator'

export default class LoginController {
  async user({ request }){
    var query = request.all()
    if (query.login_type == 'user') {
      var data = await User.findBy('user_name', query.user_name)
      var obj = {}
      if (!data) {
        obj = {
          code: '2',
          massage: '账户不存在',
          data: data
        }
      } else {
        if(data.password !== query.password) {
          obj = {
            code: '3',
            massage: '密码错误',
            data: null
          }
        } else {
          obj = {
            code: '1',
            massage: '成功',
            data: data
          }
        }
      }
      request.obj = obj
      request.login_type = '用户登录'
      return obj
    } else {
      var data = await Administrator.findBy('user_name', query.user_name)
      var obj = {}
      if (!data) {
        obj = {
          code: '2',
          massage: '账户不存在',
          data: data
        }
      } else {
        if(data.password !== query.password) {
          obj = {
            code: '3',
            massage: '密码错误',
            data: null
          }
        } else {
          obj = {
            code: '1',
            massage: '成功',
            data: data
          }
        }
      }
      request.obj = obj
      request.login_type = '管理员登录'
      return obj
    }
  }
}
