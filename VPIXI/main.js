import * as PIXI from '../pixi.mjs'
import renderer from './renderer.js';

const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.view);
console.log('asa', renderer);

const style = new PIXI.TextStyle({
    fontSize: 12
});

const TOTAL = 1000

function rd({ el, key }) {
    return {
        el, key,
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

function fc() {
    let a = []
    for (let index = 0; index < TOTAL; index++) {
        a.push(rd({ key: index }));
    }
    return a
}

function loop() {
    let newc = old.children.map(text => isCoinT() ? rd(text) : text)
    let newNode = {
        ...old,
        children: newc
    }
    old = newNode
    renderer.render(newNode, app.stage)
}

const vnode = {
    type: 'container',
    children: fc()
}
let old = vnode

let test = isCoinT()
console.log(test)
function isCoinT() {
    return Math.random() > 0.5
}

if (test) {
    renderer.render(vnode, app.stage)
    console.log(app.stage)
    app.ticker.add(() => loop());
} else {
    let a = new Array(TOTAL).fill(0).map(() => new PIXI.Text('', style))
    app.stage.addChild(...a)
    app.ticker.add(() => {
        a.forEach(c => {
            if (isCoinT()) {
                c.text = parseInt(Math.random() * TOTAL) + ''
                c.position = {
                    x: parseInt(Math.random() * 1920),
                    y: parseInt(Math.random() * 1080)
                }
            }
        })
    });
}

