import * as PIXI from '../../pixi.mjs'
import Cell from './cell.js'
import { handModel } from '../utils/hand.js'

const sizeX = 120
const sizeY = 150

// 我内部有floor对象，我根据floor对象生成了pixijs内部对象，然后pixijs根据这些对象进行渲染
// 那我的model层到底是哪一个呢？我自己的，还是pixijs的？
// 暂时一种理解是，pixijs只用于渲染的原则，如果我把pixijs完全看作view层，感觉合适一点？
// 想想gameloop，每次循环我会监听输入，然后修改我自己的对象，貌似需要一种同步机制，监听我的对象的变更，修改pixi内部的对象

class Floor {
    row
    col
    cells
    constructor(option) {
        option = {
            row: 6,
            col: 9,
            rows: [{
                idx: 2,
                type: 'grass'
            }],
            cols: [0, 1, 2, 3, 4, 5, 6, 7, 8]
        }
        const { row, col } = option
        this.row = row
        this.col = col
        this.cells = new Array(row).fill().map(() => new Array(col).fill().map(() => new Cell()))
        this.init()
    }

    init() {
        this.cells.forEach((row, i) => {
            row.forEach((cell, j) => {
                cell.position.x = j * sizeX
                cell.position.y = i * sizeY
                cell.type = (i + j) % 2 === 0 ? 'ground' : 'ground_dark'
            });
        });
    }

    getCell(x, y) {
        return floorView.getChildAt(x * this.row + y)
    }

    updateCell(x, y) {
        const content = handModel.releaseObject()
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

const floorModel = new Floor()
const floorView = new PIXI.Container()
floorView.x = 100
floorView.y = 100

const { cells, row, col } = floorModel
for (let i = 0; i < row; i++) {
    const row = []
    for (let j = 0; j < col; j++) {
        const cell = cells[i][j]
        const { baseSpritePath: path, position } = cell 
        const grass = PIXI.Sprite.from(path)
        grass.position.x = position.x
        grass.position.y = position.y
        cell.test = grass
        row.push(grass)
    }
    floorView.addChild(...row)
}

floorView.eventMode = 'static'
floorView.on('pointerdown', (e) => {
    const { x, y } = e
    const localX = x - 100
    const loclaY = y - 100
    const _x = Math.floor(loclaY / sizeY)
    const _y = Math.floor(localX / sizeX)
    floorModel.updateCell(_x, _y)
})
// floorView.on('pointermove', (e) => {
//     const { x, y } = e
//     const localX = x - 100
//     const loclaY = y - 100
//     const row = Math.floor(loclaY / sizeY)
//     const col = Math.floor(localX / sizeX)
// })

export {
    floorModel,
    floorView
}