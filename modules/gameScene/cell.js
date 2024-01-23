const sprites = new Map()
sprites.set('ground', 'assets/img/dark.png')

export default class Cell {
    // 贴图和位置还有待思考。。。
    type // 地板，草地,水面，屋顶
    position = { x: 0, y: 0 }
    size = 20
    baseSprite
    isEmpty = true
    curPlant
    extraSprite
    constructor(type = 'ground', position) {
        this.type = type
        this.baseSprite = sprites.get(this.type)
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
