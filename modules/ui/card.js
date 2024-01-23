import { Size2D } from "../basic/basic.js"
import plantMap from "../plants/plantList.js"

export default class Card {
    size
    padding
    border
    margin
    content
    interaction
    renderer
    constructor(size = new Size2D(), type = 'plant', name = 'sunFlower') {
        this.size = size
        if (type === 'plant')
            this.content = plantMap.get(name)
    }
}