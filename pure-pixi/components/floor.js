import { Grid } from "../core/ExtensionClass.js"
import { MySprite, Vector2 } from "../core/BasicClass.js"
import { render } from "../core/renderer.js"
import { handController } from "../utils/hand.js"

const option = {
    row: 5,
    col: 9,
    cellWidth: 120,
    cellHeight: 150
}

const config = {
    name: 'floor',
    props: {
        position: new Vector2(100, 200),
        eventMode: 'static',
        [Symbol.for('handlers')]: {
            pointerdown(e) {
                if (handController.hasObject()) {
                    const { position } = this
                    const { x, y } = e
                    const localX = x - position.x
                    const localY = y - position.y
                    const i = Math.floor(localY / option.cellHeight)
                    const j = Math.floor(localX / option.cellWidth)
                    if (floorController.isCellEmty(i, j))
                        floorController.fillCell(i, j)
                }
            }
        }
    }
}

const children = []
for (let i = 0; i < option.row; i++) {
    for (let j = 0; j < option.col; j++) {
        children.push(new MySprite({
            name: 'cell',
            props: {
                path: (i + j) % 2 === 0 ? '/assets/img/dark.png' : '/assets/img/light.png'
            },
            state: {
                isEmpty: true
            }
        }))
    }
}
config.children = children

const templateObject = new Grid(option, config)
const vnode = templateObject.render()
const view = render(vnode)
const model = {
    ...vnode,
    getCell(i, j) {
        return this.children[i * option.col + j]
    },
    fillCell(i, j, vnode) {
        const cell = this.getCell(i, j)
        cell.state.isEmpty = false
        if (!Array.isArray(cell.children)) {
            cell.children = [vnode]
        } else {
            cell.children.push(vnode)
        }
    },
    clearCell() {
        const cell = this.getCell(i, j)
        cell.state.isEmpty = true
        cell.children.pop()
    }
}

const floorController = {
    model,
    view,
    isCellEmty(i, j) {
        return model.getCell(i, j).state.isEmpty
    },
    fillCell(i, j) {
        const vnode = handController.releaseObject()
        model.fillCell(i, j, vnode)
        const childView = render(vnode)
        childView.position = {
            x: 1,
            y: 1
        }
        view.children[i * option.col + j].addChild(childView)
    }
}

export {
    floorController
}