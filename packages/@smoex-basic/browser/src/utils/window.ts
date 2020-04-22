import { IS_WINDOWS, IS_MOBILE } from './device'

export function initInnerHeight(rootNode: HTMLElement | null) {
    if (!rootNode) {
        return false
    }
    // windows 如果不减去两个像素就会出现滚动条
    const heightOffset = IS_WINDOWS ? -2 : 0
    const innerHeight = window.innerHeight
    rootNode.style.minHeight = innerHeight ? innerHeight + heightOffset  + 'px' : '100vh'
    return true
}

// 初始化窗口宽度, web 端非响应式兼容时使用，保证窗口自动缩放
export function initWindowWidth() {
    if (!IS_MOBILE) {
        return
    }
    const initWidth = () => {
        const innerWidth = window.innerWidth ? window.innerWidth + 'px' : '100vw'
        document.getElementsByTagName('html')[0].style.minWidth = innerWidth;
    }
    initWidth()
    window.addEventListener('resize', () => {
        initWidth()
    })
}
