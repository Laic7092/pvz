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
    const { interation } = card
    const path = card.content.baseSpritePath
    const sprite = PIXI.Sprite.from(path)
    if (interation) {
        sprite.eventMode = 'static'
        sprite.on(interation.type, interation.callBack)
    }
    const { width, height } = card.size
    sprite.position.x = idx * card.size.width * idx
    sprite.width = width
    sprite.height = height
    container1.addChild(sprite)
})

const hand = new PIXI.Container()
// hand.addChild(PIXI.Sprite.from('/assets/img/dark.png'))
hand.eventMode = 'dynamic'
hand.on('globalmousemove', (e) => {
    // console.log(e)
    const { x, y } = e
    hand.x = x
    hand.y = y
})
app.stage.addChild(hand)

console.log(app.stage)

// app.stage.addChild(floor)
// const floor = floorObj.cells.forEach(row => {
//     row.forEach(cell => {
//         console.log(cell.baseSprite)
//     })
// });




