import { Application, Container, Sprite } from './pixi.mjs'
import Floor from "./modules/gameScene/floor.js";

const app = new Application({ width: 1600, height: 900 });
document.body.appendChild(app.view);

const floorObj = new Floor()
console.log(floorObj)
const floor = new Container()
floor.x = 100
floor.y = 100
const sizeX = 30
const sizeY = 40


for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {
        const darkGrass = Sprite.from('/assets/img/dark.img');
        darkGrass.position.x = i * sizeX
        darkGrass.position.y = j * sizeY
        floor.addChild(darkGrass)
    }
}

app.stage.addChild(floor)
// const floor = floorObj.cells.forEach(row => {
//     row.forEach(cell => {
//         console.log(cell.baseSprite)
//     })
// });




