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
