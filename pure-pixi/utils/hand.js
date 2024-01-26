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
                this.position = {
                    x, y
                }
            }
        }
    }
}
const hand = new MyContainer(config)
const handModel = render(hand.render())

const handController = {
    model: handModel,
    add() {
        this.model.addChild
    },
    delete() {

    },
    update() {

    },
    get() {

    }
}

export {
    handController
}
class hHand {
    // 手中有？可以和啥交互？感觉这海曼重要
    content
    source
    target
    #renderer
    constructor() {

    }

    get renderer() {
        return this.#renderer
    }

    set renderer(renderer) {
        this.#renderer = renderer
        if (renderer) {
            const content = this.content
            const { type = 'img' } = content
            if (type === 'img') {
                const item = PIXI.Sprite.from(content.baseSpritePath)
                item.position.x = 1
                item.position.y = 1
                item.width = 75
                item.height = 75
                handView.addChild(item)
            }
        } else if (handView.children[0]) {
            handView.removeChildAt(0)
        }

    }

    clear() {
        this.content = null
        this.renderer = null
    }

    holdObject(content) {
        this.content && this.clear()
        if (content) {
            this.content = content
            const config = { size: { width: 75, height: 75 } }
            this.renderer = new Renderer(config)
        }
    }

    releaseObject() {
        const _content = this.content
        if (_content) {
            this.clear()
        }
        return _content
    }

    throwObject() {

    }
}
