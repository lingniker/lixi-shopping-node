import { ApplicationContract } from '@ioc:Adonis/Core/Application'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class LogisticProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    // console.log('this.app.abcd.........1', this.app.abcd)
    // console.log('LogisticProvider LogisticProvider LogisticProvider----------#### register')
    this.app.container.bind('Adonis/Logistic', (app) => {
      const Logistic = require('./Logistic')
      return new Logistic(this.app);
    })
  }

  public async boot() {
    // All bindings are ready, feel free to use them
    // console.log('this.app.abcd.........2', this.app.abcd)
    // console.log('LogisticProvider LogisticProvider LogisticProvider----------#### boot')
  }

  public async ready() {
    // App is ready
    // const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
    // const Event = this.app.container.resolveBinding('Adonis/Core/Event')
    // Event.on('db:query', Database.prettyPrint)
    console.log('this.app.abcd.........3', this.app.abcd)
    console.log('LogisticProvider LogisticProvider LogisticProvider----------#### ready')
  }

  public async shutdown() {
    // Cleanup, since app is going down
    console.log('++++++shutdown++++++++')
    console.log('this.app.abcd.........4', this.app.abcd)
    console.log('LogisticProvider LogisticProvider LogisticProvider----------#### shutdown')
  }
}
