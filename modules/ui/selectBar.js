import Card from "./card.js"
import { Size2D, Interaction, Renderer } from "../basic/basic.js"
import hand from "../utils/hand.js"

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
        this.cards.forEach((card, idx) => {
            card.interaction = new Interaction('static', 'pointerdown', () => {
                hand.content = card
                console.log('cardPointerDown', hand)
            })
            const { width, height } = card.size
            const position = {
                x: idx * width,
                y: 0
            }
            card.renderer = new Renderer(position, card.size)
        })
    }

    get length() {
        return this.cards.length
    }

}