import { Size2D } from "../basic/basic.js"
import plantMap from "../plants/plantList.js"

export default class Card {
    size
    padding
    border
    margin
    content
    constructor(size2D, type = 'plant', name = 'sunFlower') {
        this.size = new Size2D(size2D)
        if (type === 'plant')
            this.content = plantMap.get(name)
    }
}