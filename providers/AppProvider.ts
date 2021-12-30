import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
    console.log('AppProvider AppProvider AppProvider----------#### register')
  }

  public async boot () {
    console.log('AppProvider AppProvider AppProvider----------#### boot')
    // IoC container is ready
  }

  public async ready () {    
    // App is ready
    console.log('AppProvider AppProvider AppProvider----------#### ready')
  }

  public async shutdown () {
    // Cleanup, since app is going down
    console.log('AppProvider AppProvider AppProvider----------#### shutdown')
  }
}
