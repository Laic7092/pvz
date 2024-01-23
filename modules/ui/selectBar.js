import Card from "./card.js"
import { Size2D, Interaction, Renderer } from "../basic/basic.js"
import { model as hand } from "../utils/hand.js"
import * as PIXI from '../../pixi.mjs'

const size2D = new Size2D({
    width: 75,
    height: 75
})
const type = 'plant'

class SelectBar {
    cards = []
    constructor(cardNames = []) {
        if (Array.isArray(cardNames)) {
            cardNames.forEach(name => {
                this.cards.push(new Card(size2D, type, name))
            })
        }
        this.cards.forEach((card, idx) => {
            card.interaction = new Interaction('static', 'pointerdown', () => {
                hand.holdObject(card.content)
            })
            const { width, height } = card.size
            const position = {
                x: idx * width,
                y: 0
            }
            card.renderer = new Renderer({
                position,
                size: card.size
            })
        })
    }

    get length() {
        return this.cards.length
    }

}

const container = new PIXI.Container()
const selectBar = new SelectBar(['sunFlower', 'shoot'])
selectBar.cards.forEach((card, idx) => {
    const { interaction, renderer } = card
    const path = card.content.baseSpritePath
    const sprite = PIXI.Sprite.from(path)
    if (interaction) {
        const { eventMode, eventType, callBack } = interaction
        sprite.eventMode = eventMode
        sprite.cursor = 'pointer'
        sprite.on(eventType, callBack)
    }
    if (sprite.isInteractive()) {
        // debugger
        // sprite is interaction
    }
    const { size, position } = renderer
    sprite.position.x = position.x
    sprite.width = size.width
    sprite.height = size.height
    container.addChild(sprite)
})

export const model = selectBar
export const view = container