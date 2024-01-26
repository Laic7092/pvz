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
render(selectBar.render(), rootContainer)

console.log(floorController)
console.log(handController)