import Card from "./card.js"
import { Size2D, Interable } from "../basic/basic.js"

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
        this.cards.forEach(card => {
            card.select = (e) => {
                console.log(e, card)
            }
            card.interation = new Interable('click', card.select)
        })
    }

    get length() {
        return this.cards.length
    }

}