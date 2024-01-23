import * as PIXI from '../../pixi.mjs'
import Cell from './cell.js'

class Floor {
    row = 6
    col = 9
    cells = null

    constructor(option) {
        option = {
            row: 5,
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
        const cells = Array.from({ length: this.row }, () => new Array(this.col).fill(new Cell()));
        this.cells = cells
    }
}

const container = new PIXI.Container()
container.x = 100
container.y = 100
const sizeX = 120
const sizeY = 150

for (let i = 0; i < 5; i++) {
    const row = []
    for (let j = 0; j < 9; j++) {
        const path = (i + j) % 2 === 0 ? '/assets/img/dark.png' : '/assets/img/light.png'
        const grass = PIXI.Sprite.from(path)
        grass.position.x = j * sizeX
        grass.position.y = i * sizeY
        row.push(grass)
    }
    container.addChild(...row)
}



export const model = new Floor()
export const view = container

