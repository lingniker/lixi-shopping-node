import { ApplicationContract } from '@ioc:Adonis/Core/Application'
class logistic {
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

// router.post('/api/TransOutTry', (ctx, next) => {
//   console.log("TransOutTry")
//   ctx.body = { result: "SUCCESS" } 
// })
// .post('/api/TransOutConfirm', (ctx, next) => {
//   console.log("TransOutConfirm")
//   ctx.body = { result: "SUCCESS" } 
// })
// .post('/api/TransOutCancel', (ctx, next) => {
//   console.log("TransOutCancel")
//   ctx.body = { result: "SUCCESS" }
// })
// .post('/api/TransInTry', (ctx, next) => {
//   console.log("TransInTry")
//   ctx.body = { result: "SUCCESS" }
// })
// .post('/api/TransInConfirm', (ctx, next) => {
//   console.log("TransInConfirm")
//   ctx.body = { result: "SUCCESS" }
// })
// .post('/api/TransInCancel', (ctx, next) => {
//   console.log("TransInCancel")
//   ctx.body = { result: "SUCCESS" }
// })

// async function FireTcc() {
//   let dtm = "http://localhost:8080/api/dtmsvr" // dtm服务地址   
//   let svc = "http://localhost:4005/api" // 本地服务前缀   // 开启一个tcc事务，第二个参数里面，写全局事务的逻辑   
//   await dtmcli.tccGlobalTransaction(dtm, async (t) => {     
//     let req = { amount: 30 } // 子事务需要的负荷
//     console.log("calling trans out")     // 注册事务分支，并调用分支中的Try     
//     await t.callBranch(req, svc + "/TransOutTry", svc + "/TransOutConfirm", svc + "/TransOutCancel")     
//     console.log("calling trans in")     // 注册事务分支，并调用分支中的Try     
//     await t.callBranch(req, svc + "/TransInTry", svc + "/TransInConfirm", svc + "/TransInCancel")   
//   })
// }

export default logistic