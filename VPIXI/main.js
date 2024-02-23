import * as PIXI from '../pixi.mjs'
import renderer from './renderer.js';

const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.view);
console.log('asa', renderer);

const vnode = {
    type: 'container',
    children: [
        {
            type: 'sprite',
            props: {
                path: '/assets/img/sunFlower.webp',
                width: 100,
                height: 100
            }
        },
        {
            type: 'text',
            props: {
                text: '1'
            }
        }
    ]
}

renderer.render(vnode, app.stage)
console.log(app.stage)

setInterval(() => {
    let nNOde = {
        type: 'container',
        children: [
            {
                type: 'sprite',
                props: {
                    path: Math.random() > 0.5 ? '/assets/img/sunFlower.webp' : '/assets/img/shoot.webp',
                    width: 100 * Math.random(),
                    height: 100 * Math.random()
                }
            },
            {
                type: 'text',
                props: {
                    text: Math.random() * 1000 + ''
                }
            }
        ]
    }
    console.log('aa', app.stage.children[0].children[0])
    renderer.render(nNOde, app.stage)
}, 1000)