import * as PIXI from '../pixi.mjs'
import './utils/symbols.js'
import { selectBarController } from './components/SelectBar.js'
import { floorController } from './components/floor.js';
import { handController } from './utils/hand.js';


const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.view);
const rootContainer = app.stage

rootContainer.addChild(floorController.view)
rootContainer.addChild(selectBarController.model)
rootContainer.addChild(handController.view)

console.log(floorController)
console.log(handController)