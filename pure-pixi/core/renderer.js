import * as PIXI from '/pixi.mjs'

function render(vnode, container) {
    let displayObject = null
    if (!vnode) return
    // 判断虚拟节点的类型
    if (vnode.tag === 'container') {
        // 容器节点
        const pixiContainer = new PIXI.Container();

        // 设置属性
        if (vnode.props) {
            for (let key in vnode.props) {
                pixiContainer[key] = vnode.props[key];
            }
        }

        // 递归渲染子节点
        if (Array.isArray(vnode.children)) {
            vnode.children.forEach(child => {
                render(child, pixiContainer);
            });
        }

        // 将容器节点添加到父容器中
        container && container.addChild(pixiContainer);
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
        container && container.addChild(sprite);
        displayObject = sprite
    } else {
        debugger
    }

    const symbols = Object.getOwnPropertySymbols(vnode.props)
    if (symbols.includes(Symbol.for('handlers')))
        setInteractive(vnode.props[Symbol.for('handlers')], displayObject)
    return displayObject
}

function setInteractive(handlers, displayObject) {
    for (const key in handlers) {
        if (Object.hasOwnProperty.call(handlers, key)) {
            const handler = handlers[key];
            displayObject.on(key, handler)
        }
    }
    console.log(handlers)
}

export {
    render
}