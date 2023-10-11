import type { Directive } from 'vue'

interface ElType extends HTMLElement {
  parentNode: any
}
const draggable: Directive = {
  mounted(el: ElType) {
    // 如果要想header拖动 则把el改成header
    // const haeder = el.parentNode.querySelector('.header')
    el.style.cursor = 'move'
    el.onmousedown = (ev) => {
      console.log(ev)
      // 鼠标按下的位置
      const mouseXStart = ev.clientX
      const mouseYStart = ev.clientY
      // 当前滑块位置
      const rectLeft = el.offsetLeft
      const rectTop = el.offsetTop
      document.onmousemove = (e) => {
        // 鼠标移动的位置
        const mouseXEnd = e.clientX
        const mouseYEnd = e.clientY
        let moveX = mouseXEnd - mouseXStart + rectLeft
        let moveY = mouseYEnd - mouseYStart + rectTop
        // 不超出可视范围
        if (moveX <= 0) {
          moveX = 5 // 设置成5,离边缘不要太近
        } else if (
          moveX >
          document.documentElement.clientWidth - el.clientWidth
        ) {
          // document.documentElement.clientWidth屏幕可视区宽度
          moveX = document.documentElement.clientWidth - el.clientWidth - 5
        }
        if (moveY <= 0) {
          moveY = 5
        } else if (
          moveY >
          document.documentElement.clientHeight - el.clientHeight
        ) {
          moveY = document.documentElement.clientHeight - el.clientHeight - 5
        }
        el.style.top = `${moveY}px`
        el.style.left = `${moveX}px`
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
      // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
      return false
    }
  }
}
export default draggable
