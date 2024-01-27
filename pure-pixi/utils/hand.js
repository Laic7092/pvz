import { MyContainer } from '../core/BasicClass.js'
import { render } from '../core/renderer.js'

const config = {
    name: 'hand',
    props: {
        eventMode: 'dynamic',
        [Symbol.for('handlers')]: {
            // 当代码从内联事件处理器属性调用时，它的 this 绑定到放置监听器的 DOM 元素上：
            globalpointermove(e) {
                const { x, y } = e
                this.position = { x, y }
            }
        }
    },
    state: {
        content: null
    }
}

const templateObject = new MyContainer(config)
const vnode = templateObject.render()
const view = render(vnode)
const model = {
    ...vnode,
    getContent() {
        return this.state.content
    },
    setContent(content) {
        this.state.content = content
    },
    addChild(vnode) {
        !Array.isArray(this.children) && (this.children = [])
        this.children.push(vnode)
    },
    removeChild() {
        return this.children.pop()
    }
}

const handController = {
    model,
    view,
    hasObject() {
        return this.model.state.content !== null
    },
    holdObject(vnode) {
        if (!vnode) return
        this.model.setContent(vnode)
        this.model.addChild(vnode)
        const childView = render(vnode)
        childView.position = {
            x: 1,
            y: 1
        }
        this.view.addChild(childView)
    },
    releaseObject() {
        if (!this.hasObject()) return
        this.model.setContent(null)
        this.view.removeChildAt(0)
        return this.model.removeChild()
    }
}

export {
    handController
}
