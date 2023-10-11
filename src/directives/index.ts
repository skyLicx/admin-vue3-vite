// import directives
import { App } from 'vue'
import draggable from './modules/draggable'

const directivesList: any = {
  // Custom directives
  draggable
}

const directives = {
  install(app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // 注册自定义指令
      app.directive(key, directivesList[key])
    })
  }
}

export default directives
