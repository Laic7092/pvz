import * as PIXI from '../pixi.mjs'
import renderer from './renderer.js';

const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.view);
console.log('asa', renderer);

const style = new PIXI.TextStyle({
    fontSize: 12
});

const TOTAL = 1000
let rate = 0

function changeRate(val) {
    rate = val
}
window.changeRate = changeRate

function rd() {
    return {
        type: 'text',
        props: {
            text: parseInt(Math.random() * TOTAL) + '',
            position: {
                x: parseInt(Math.random() * 1920),
                y: parseInt(Math.random() * 1080)
            },
            style
        }
    }
}

function rdi() {
    return new Array(1000).fill(0).map(() => Math.random() > rate)
}

function fc() {
    let a = []
    for (let index = 0; index < TOTAL; index++) {
        a.push(rd());
    }
    return a
}

function up(a, b) {
    return a.map((element, i) => element ? rd() : b[i])
}

const vnode = {
    type: 'container',
    children: fc()
}

renderer.render(vnode, app.stage)
console.log(app.stage)

let old = vnode

function loop() {
    let newNode = {
        type: 'container',
        children: up(rdi(), old.children)
    }
    old = newNode
    renderer.render(newNode, app.stage)
}
setInterval(loop, 0)
