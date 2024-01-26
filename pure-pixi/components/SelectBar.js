import { Grid } from "../core/ExtensionClass.js"
import { MySprite,Vector2 } from "../core/BasicClass.js"


const option = {
    row: 1,
    col: 9,
    cellWidth: 100,
    cellHeight: 100
}

const config = {
    name: 'selectBar',
    props: {
        position: new Vector2()
    },
    children: new Array(option.col).fill(0).map(() => new MySprite({
        name: 'card',
        props: {
            path: '/assets/img/shoot.webp',
            width: 100,
            height: 100
        }
    }))
}

const selectBar = new Grid(option, config)
// console.log(selectBar)

export {
    selectBar
}
