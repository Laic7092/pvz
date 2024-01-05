import Card from "./card.js"
import { Size2D } from "../basic/basic.js"

const size2D = new Size2D({
    width: 75,
    height: 75
})
const type = 'plant'

export default class SelectBar {
    cards = []
    constructor(cardNames = []) {
        if (Array.isArray(cardNames)) {
            cardNames.forEach(name => {
                this.cards.push(new Card(size2D, type, name))
            })
        }
    }

    get length() {
        return this.cards.length
    }

}