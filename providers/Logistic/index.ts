class logistic {
  constructor(){
    this.state = 1
  }
  async post(){
    console.log('Logistic 创建事务成功')
    this.state = 2
    return {
      code: '1',
      massage: '创建事务成功'
    }
  }
  async commit () {
    this.state = 3
    console.log('commit 创建事务成功')
    // massage: '创建事务成功'
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

export default logistic