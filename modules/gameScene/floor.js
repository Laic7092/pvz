class Cell {
    // 贴图和位置还有待思考。。。
    type = 'ground' // 地板，草地,水面，屋顶
    position = { x: 0, y: 0 }
    size = 20
    baseSprite
    isEmpty = true
    curPlant
    extraSprite
    constructor(type, position) {
        this.type = type
        this.position = position
    }

    plant(plant) {
        if (!this.isEmpty) {
            this.curPlant = plant
            this.isEmpty = false
            this.extraSprite = plant.baseSprite
        }
    }

    clear() {
        if (!this.isEmpty) {
            this.curPlant = null
            this.isEmpty = true
            this.extraSprite = null
        }
    }
}


class Floor {
    row = 6
    col = 9
    // cells = Array.from({ length: this.row }, () => new Array(this.col).fill(null));
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

    }


}

