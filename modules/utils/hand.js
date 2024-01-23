import { Renderer, Interaction } from '../basic/basic.js'
import * as PIXI from '../../pixi.mjs'

class Hand {
    // 手中有？可以和啥交互？感觉这海曼重要
    content
    source
    target
    constructor() {

    }

    holdObject(content) {
        if (this.content) {
            view.removeChildAt(0)
            this.content = null
        }
        if (content) {
            this.content = content
            const config = { size: { width: 75, height: 75 } }
            this.renderer = new Renderer(config)
            const { type = 'img' } = content
            if (type === 'img') {
                const item = PIXI.Sprite.from(content.baseSpritePath)
                item.width = 75
                item.height = 75
                view.addChild(item)
            }
            console.log(this.content)
        }
    }
}

const hand = new PIXI.Container()
hand.eventMode = 'dynamic'
hand.on('globalpointermove', (e) => {
    const { x, y } = e
    hand.x = x
    hand.y = y
})


export const handModel = new Hand()
export const handview = hand