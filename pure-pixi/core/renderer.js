import * as PIXI from '../../pixi.mjs'

// 返回基础对象
const baseType = new Map()
baseType.set('container', () => new PIXI.Container())
baseType.set('sprite', ({ path }) => PIXI.Sprite.from(path))
baseType.set('text', ({ text }) => new PIXI.Text(text))

function renderer(vnode, container) {
    let displayObject = null
    if (typeof vnode.tag === 'string') {
        // 说明 vnode 描述的是标签元素
        displayObject = mountElement(vnode, container)
    } else if (typeof vnode.tag === 'function') {
        // 说明 vnode 描述的是组件
        displayObject = mountComponent(vnode, container)
    }
    return displayObject
}

function mountElement(vnode, container) {
    const { type, props, children } = vnode
    const pixiContainer = baseType.get(type)(props)

    const handlerSymbol = Symbol.for('handlers')
    const symbols = Object.getOwnPropertySymbols(props)
    if (symbols.includes(handlerSymbol))
        setInteractive(props[handlerSymbol], pixiContainer)

    if (Array.isArray(children)) {
        children.forEach(child => renderer(child, pixiContainer))
    }
    container && container.addChild(pixiContainer)
    return pixiContainer
}

function mountComponent(vnode, container) {
    // 调用组件函数，获取组件要渲染的内容（虚拟 DOM）
    const subtree = vnode.type.render()
    // 递归地调用 renderer 渲染 subtree
    return renderer(subtree, container)
}

function render(vnode, container) {
    let displayObject = null
    if (!vnode) return
    const { type, props, children } = vnode
    if (typeof type === 'string') {
        const pixiContainer = baseType.get(type)(props)
        pixiContainer._vnode = vnode
        // 设置属性
        if (props) {
            for (let key in vnode.props) {
                pixiContainer[key] = vnode.props[key];
            }
        }

        // 递归渲染子节点
        if (Array.isArray(children)) {
            children.forEach(child => {
                render(child, pixiContainer);
            });
        }

        // 将容器节点添加到父容器中
        container && container.addChild(pixiContainer);
        displayObject = pixiContainer
    }

    const handlerSymbol = Symbol.for('handlers')
    const symbols = Object.getOwnPropertySymbols(props)
    if (symbols.includes(handlerSymbol))
        setInteractive(props[handlerSymbol], displayObject)

    return displayObject
}

function setInteractive(handlers, displayObject) {
    for (const key in handlers) {
        if (Object.hasOwnProperty.call(handlers, key)) {
            const handler = handlers[key];
            displayObject.on(key, handler)
        }
    }
}

export {
    render,
    renderer
}