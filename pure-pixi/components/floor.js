import { Grid } from "../core/ExtensionClass.js"
import { MySprite } from "../core/BasicClass.js"
import { render } from "../core/renderer.js"

const option = {
    row: 5,
    col: 9,
    cellWidth: 120,
    cellHeight: 150
}

const config = {
    name: 'floor',
    props: {
        position: {
            x: 100,
            y: 200
        },
        eventMode: 'static',
        [Symbol.for('handlers')]: {
            pointerdown() {
                console.log(666)
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
            }
        }))
    }
}
config.children = children
const floor = new Grid(option, config)

const floorModel = render(floor.render())

const floorController = {
    floor,
    model: floorModel,
    getCell(x, y) {
        return floorModel.getChildAt(x * this.row + y)
    },
    updateCell(x, y) {
        const content = floorModel.releaseObject()
        if (!content) return
        // debugger
        const mcell = this.cells[x][y]
        // const vcell = this.getCell(x, y)
        const vcell = mcell.test
        const { baseSpritePath: path } = content
        const sprite = PIXI.Sprite.from(path)
        sprite.width = 75
        sprite.height = 75
        vcell.addChild(sprite)
    }
}
// floorView.eventMode = 'static'
// floorView.on('pointerdown', (e) => {
//     const { x, y } = e
//     const localX = x - 100
//     const loclaY = y - 100
//     const _x = Math.floor(loclaY / sizeY)
//     const _y = Math.floor(localX / sizeX)
//     floorModel.updateCell(_x, _y)
// })

export {
    floorController
}