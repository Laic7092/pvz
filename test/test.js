import * as PIXI from './pixi.mjs'
import { selectBar } from './components/SelectBar.js'


const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.view);
const rootContainer = app.stage

function render(vnode, container) {
    let displayObject = null
    // 判断虚拟节点的类型
    if (vnode.tag === 'container') {
        // 容器节点
        const pixiContainer = new PIXI.Container();

        // 设置属性
        if (vnode.props) {
            for (let key in vnode.props) {
                if (key !== 'position') {
                    pixiContainer[key] = vnode.props[key];
                }
            }

            // 设置位置
            if (vnode.props.position) {
                pixiContainer.position.set(vnode.props.position.x, vnode.props.position.y);
            }
        }

        // 递归渲染子节点
        if (vnode.children) {
            vnode.children.forEach(child => {
                render(child, pixiContainer);
            });
        }

        // 将容器节点添加到父容器中
        container.addChild(pixiContainer);
        displayObject = pixiContainer
    } else if (vnode.tag === 'sprite') {
        // Sprite节点
        const sprite = PIXI.Sprite.from(vnode.props.path);

        // 设置属性
        if (vnode.props) {
            for (let key in vnode.props) {
                if (key !== 'path') {
                    sprite[key] = vnode.props[key];
                }
            }
        }

        // 将Sprite节点添加到父容器中
        container.addChild(sprite);
        displayObject = sprite
    }
    return displayObject
}

const selectBarModel = render(selectBar.render(), rootContainer)

let cnt = 0
let fps = 60
app.ticker.add((delta) => {
    // if (cnt++ <= fps) return
    selectBarModel.children.forEach(child => {
        child.x += Math.random()*5
        child.y += Math.random()*5
    })
    // cnt = 0
});