import { ApplicationContract } from '@ioc:Adonis/Core/Application'

class InstantMessenger {
  constructor(protected app: ApplicationContract){
    this.state = 1
  }
  async prepare(){
    console.log('Logistic 创建事务成功') // this.app.databaseTrx
    this.state = 2
    return {
      code: '1',
      massage: '创建事务成功'
    }
  }
  async commit () {
    this.state = 3
    // console.log('commit 创建事务成功')
    // massage: '创建事务成功'
    console.log('commit 创建事务成功')
    return {
      code: '1',
      massage: '提交成功'
    }
  }
  async rollback () {
    this.state = 0
    return {
      code: '1',
      massage: '回滚成功'
    }
  }
}

export default InstantMessenger;