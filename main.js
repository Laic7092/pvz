import * as PIXI from './pixi.mjs'
import { floorView} from "./modules/gameScene/floor.js"
import { view as selectBar } from './modules/ui/selectBar.js'
import { handView } from './modules/utils/hand.js'

const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.view);

// 根据add顺序决定渲染顺序，也就是层级，月后的层级越高
// 所以前景，背景，以及中间层的顺序需要注意
app.stage.addChild(floorView)
app.stage.addChild(handView)
app.stage.addChild(selectBar)

console.log(app.stage)



