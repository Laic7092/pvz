import { MyContainer } from "./BasicClass.js"

// 理論上來說，Grid只是一个布局的组件，内容是随意的
// 传入一维数组，按照瓦Grid布局排列
// 为了稳定性感觉还是要多农协错误处理
class Grid extends MyContainer {
    row
    col
    cellWidth
    cellHeight
    gridCfg
    cellCfgs
    constructor(option, config) {
        super(config)
        const { row, col, cellWidth, cellHeight } = option
        Object.assign(this, { row, col, cellWidth, cellHeight })
        this.cellCfgs = new Array(row * col).fill(0).map(() => ({}))
        if (Array.isArray(this.children) && this.children.length === row * col)
            this.setLayout(row, col, cellWidth, cellHeight)
    }

    setLayout(row, col, cellWidth, cellHeight) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                Reflect.set(this.children[i * col + j].props, 'position', {
                    x: j * cellWidth,
                    y: i * cellHeight
                })
            }

        }
    }
}


export {
    Grid
}