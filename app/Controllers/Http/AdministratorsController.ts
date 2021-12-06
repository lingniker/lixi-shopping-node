// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Administrator from 'App/Models/Administrator'
export default class AdministratorsController {
  async getList ({ request, response }) {
    var query = request.all()
    var administrators = null;
    if (query._user_name) {
      administrators = await Administrator.query().where('user_name', 'LIKE', '%'+query._user_name+'%').orderBy('id', 'asc').paginate(query.current_page, 10)
    } else {
      administrators = await Administrator.query().orderBy('id', 'desc').paginate(query.current_page ? query.current_page : 1, 10)
    }
    var obj = {
      code: '1',
      massage: '获取商品列表成功',
      data: administrators
    }
    return obj
  }
}
