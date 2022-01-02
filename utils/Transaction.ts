/*
|--------------------------------------------------------------------------
| Transaction
|--------------------------------------------------------------------------
|
| Processing transaction
|
*/

class Transaction {
  constructor (order, logistic) {
    this.state = '0'
    this.order = order // 订单事务
    this.logistic = logistic // 物流事务
  }
  public async prepare () { // prepare 准备
    await this.order.prepare() // 订单准备
    if (this.order.state === '2') { //  订单状态 2准备
      await this.logistic.prepare() //  物流状态
      if (this.logistic.state === '2') { //  物流状态 2准备
        this.state = '1'
        this.commit() // 事务提交
      } else {
        this.order.rollback() // 订单事务回滚
        this.logistic.rollback() // 物流事务回滚
      }
    } else {
      this.order.rollback()
    }
  }
  public commit () {
    await this.logistic.commit() // 物流事务提交
    if (this.logistic.state === '3') {
      this.state = '4'
      this.order.commit() // 订单事务事务完成
    } else {
      this.order.rollback() // 订单事务回滚
      this.logistic.rollback() // 物流事务回滚
    }
  }
  public rollback () {}
}

exports Transaction;