import * as PIXI from './pixi.mjs'
import Floor from "./modules/gameScene/floor.js";

const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.view);

// const floorObj = new Floor()
// console.log(floorObj)
const container = new PIXI.Container()
// container.x = app.screen.width / 2;
container.x = 100
// container.y = app.screen.height / 2;
container.y = 100
app.stage.addChild(container);
// floor.x = 100
// floor.y = 100
const sizeX = 120
const sizeY = 150


for (let i = 0; i < 5; i++) {
    const row = []
    for (let j = 0; j < 9; j++) {
        const path = (i + j) % 2 === 0 ? '/assets/img/dark.png' : '/assets/img/light.png'
        const grass = PIXI.Sprite.from(path)
        grass.position.x = j * sizeX
        grass.position.y = i * sizeY
        // floor.addChild(darkGrass)
        row.push(grass)
    }
    container.addChild(...row)
}

// app.stage.addChild(floor)
// const floor = floorObj.cells.forEach(row => {
//     row.forEach(cell => {
//         console.log(cell.baseSprite)
//     })
// });




