import { Grid } from "../core/ExtensionClass.js"
import { MySprite, Vector2 } from "../core/BasicClass.js"
import { render } from "../core/renderer.js"
import { handController } from "../utils/hand.js"
import { deepCopy } from "../utils/util.js"

const option = {
    row: 1,
    col: 9,
    cellWidth: 100,
    cellHeight: 120
}

const config = {
    name: 'selectBar',
    props: {
        position: new Vector2(),
        eventMode: 'static',
        [Symbol.for('handlers')]: {
            pointerdown(e) {
                const { position, children } = this
                const { x, y } = e
                const localX = x - position.x
                const localY = y - position.y
                const i = Math.floor(localY / option.cellHeight)
                const j = Math.floor(localX / option.cellWidth)
                handController.holdObject(deepCopy(children[j]._vnode))
            }
        }
    },
    children: new Array(option.col).fill(0).map(() => new MySprite({
        name: 'card',
        props: {
            path: '/assets/img/shoot.webp',
            width: 100,
            height: 100
        },
        state: {
            type: 'plant',
            name: 'shoot'
        }
    }))
}

const selectBar = new Grid(option, config)
const selectBarModel = render(selectBar.render())

const selectBarController = {
    selectBar,
    model: selectBarModel,

}

export {
    selectBarController
}
