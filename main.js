import * as PIXI from './pixi.mjs'
import Floor from "./modules/gameScene/floor.js"
import SelectBar from './modules/ui/selectBar.js'
import Hand from './modules/utils/hand.js'

const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.view);

const container = new PIXI.Container()
container.x = 100
container.y = 100
app.stage.addChild(container)
const sizeX = 120
const sizeY = 150

for (let i = 0; i < 5; i++) {
    const row = []
    for (let j = 0; j < 9; j++) {
        const path = (i + j) % 2 === 0 ? '/assets/img/dark.png' : '/assets/img/light.png'
        const grass = PIXI.Sprite.from(path)
        grass.position.x = j * sizeX
        grass.position.y = i * sizeY
        row.push(grass)
    }
    container.addChild(...row)
}

const container1 = new PIXI.Container()

const selectBar = new SelectBar(['sunFlower', 'shoot'])
container1.x = 0
container1.y = 0
app.stage.addChild(container1)

selectBar.cards.forEach((card, idx) => {
    const { interactive, renderable } = card
    const path = card.content.baseSpritePath
    const sprite = PIXI.Sprite.from(path)
    if (interactive) {
        const { eventMode, eventType, callBack } = interactive
        sprite.eventMode = eventMode
        sprite.cursor = 'pointer'
        sprite.on(eventType, callBack)
    }
    if (sprite.isInteractive()) {
        // debugger
        // sprite is interactive
    }
    const { size, position } = renderable
    sprite.position.x = position.x
    sprite.width = size.width
    sprite.height = size.height
    container1.addChild(sprite)
})

const hand = new PIXI.Container()
// hand.addChild(PIXI.Sprite.from('/assets/img/dark.png'))
hand.eventMode = 'dynamic'
hand.on('globalpointermove', (e) => {
    // console.log(e)
    const { x, y } = e
    hand.x = x
    hand.y = y
    // console.log(hand)
})
app.stage.addChild(hand)

console.log(app.stage)



