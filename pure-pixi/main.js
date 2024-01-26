import * as PIXI from '../pixi.mjs'
import './utils/symbols.js'
import { render } from './core/renderer.js';
import { selectBar } from './components/SelectBar.js'
import { floorController } from './components/floor.js';
import { handController } from './utils/hand.js';


const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.view);
const rootContainer = app.stage

app.stage.addChild(handController.model)
app.stage.addChild(floorController.model)
const selectBarModel = render(selectBar.render(), rootContainer)

console.log(floorController)
console.log(handController)
let cnt = 0
let fps = 60
app.ticker.add((delta) => {
    return
    // if (cnt++ <= fps) return
    selectBarModel.children.forEach(child => {
        child.x += Math.random() * 5
        child.y += Math.random() * 5
    })
    // cnt = 0
});