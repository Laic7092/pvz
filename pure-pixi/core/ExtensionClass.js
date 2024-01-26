import { MyContainer, MySprite } from "./BasicClass.js"

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
        this.cellCfgs = new Array(row).fill().map(() => new Array(col).fill().map(() => ({})))
        this.setLayout(cellWidth, cellHeight)
        this.doLayout()
    }

    setLayout(cellWidth, cellHeight) {
        this.cellCfgs.forEach((row, i) => {
            row.forEach((cell, j) => {
                const x = j * cellWidth
                const y = i * cellHeight
                cell.position = {
                    x,
                    y
                }
            });
        });
    }

    doLayout() {
        const children = this.children
        if (!Array.isArray(children)) return
        children.forEach((child, idx) => {
            const i = Math.floor(idx / this.col)
            const j = idx % this.col
            const { position } = this.cellCfgs[i][j]
            child.props.position = position
        })
    }
}


export {
    Grid
}