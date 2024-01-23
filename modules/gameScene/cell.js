const sprites = new Map()
sprites.set('ground', 'assets/img/light.png')
sprites.set('ground_dark', 'assets/img/dark.png')

export default class Cell {
    // 贴图和位置还有待思考。。。
    _type // 地板，草地,水面，屋顶
    position
    size = 20
    baseSpritePath
    isEmpty = true
    curPlant
    extraSprite
    constructor(type = 'ground', position = { x: 0, y: 0 }) {
        this.type = type
        this.position = position
    }

    plant(plant) {
        if (!this.isEmpty) {
            this.curPlant = plant
            this.isEmpty = false
            this.extraSprite = plant.baseSpritePath
        }
    }

    clear() {
        if (!this.isEmpty) {
            this.curPlant = null
            this.isEmpty = true
            this.extraSprite = null
        }
    }
    get type() {
        return this._type
    }
    /**
    * @param {string} val
    */
    set type(val) {
        this._type = val
        this.baseSpritePath = sprites.get(val)
    }
}
