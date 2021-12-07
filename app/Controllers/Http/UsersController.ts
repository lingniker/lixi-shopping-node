// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
export default class UsersController {
  async getList ({ request, response }) {
    var query = request.all()
    var users = null;
    if (query._user_name) {
      users = await User.query().where('user_name', 'LIKE', '%'+query._user_name+'%').orderBy('id', 'asc').paginate(query.current_page, 10)
    } else {
      users = await User.query().orderBy('id', 'desc').paginate(query.current_page ? query.current_page : 1, 10)
    }
    var obj = {
      code: '1',
      massage: '获取商品列表成功',
      data: users
    }
    return obj
  }
}