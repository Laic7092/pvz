import * as PIXI from '../pixi.mjs'

// 返回基础对象
const baseType = new Map()
baseType.set('container', () => new PIXI.Container())
baseType.set('sprite', () => new PIXI.Sprite())
baseType.set('text', () => new PIXI.Text())


//双向链接？
class PIXIObj {
    _vnode // 我的对象
}
class vnode {
    el // PIXI对象
}

const renderer = createRenderer({
    createElement(type) {
        console.log(`创建元素 ${type}`)
        return baseType.get(type)()
    },
    setElementText(el, text) {
        console.log(`设置 ${JSON.stringify(el)} 的文本内容：${text}`)
        el.textContent = text
    },
    insert(el, parent, anchor = null) {
        console.log(`将 ${el} 添加到${parent} 下`)
        parent.addChild(el)
    }
})

function createRenderer(options) {
    const {
        createElement,
        setElementText,
        insert
    } = options
    function unmount(vnode) {
        // 还可以调用其他操作   
        const parent = vnode.el.parentNode
        if (parent) {
            parent.removeChild(vnode.el)
        }
    }
    function mountElement(vnode, container) {
        const el = vnode.el = createElement(vnode.type)
        if (typeof vnode.children === 'string') {
            setElementText(el, vnode.children)
        } else if (Array.isArray(vnode.children)) {
            // 如果 children 是数组，则遍历每一个子节点，并调用 patch 函数挂载它们
            vnode.children.forEach(child => {
                patch(null, child, el)
            })
        }
        if (vnode.props) {
            // 遍历 vnode.props
            for (const key in vnode.props) {
                patchProps(el, key, null, vnode.props[key])
            }
        }
        insert(el, container)
    }
    function mountComponent(vnode, container, anchor) {
        // 通过 vnode 获取组件的选项对象，即 vnode.type
        const componentOptions = vnode.type
        // 获取组件的渲染函数 render
        const { render } = componentOptions
        // 执行渲染函数，获取组件要渲染的内容，即 render 函数返回的虚拟 DOM
        const subTree = render()
        // 最后调用 patch 函数来挂载组件所描述的内容，即 subTree
        patch(null, subTree, container, anchor)
    }
    function patchElement(n1, n2) {
        const el = n2.el = n1.el
        const oldProps = n1.props
        const newProps = n2.props
        // 第一步：更新 props
        for (const key in newProps) {
            if (newProps[key] !== oldProps[key]) {
                patchProps(el, key, oldProps[key], newProps[key])
            }
        }
        for (const key in oldProps) {
            if (!(key in newProps)) {
                patchProps(el, key, oldProps[key], null)
            }
        }
        // 第二步：更新 children
        patchChildren(n1, n2, el)
    }
    function patchComponent(n1, n2) {

    }
    function patchProps(el, key, prevValue, nextValue) {
        if (/^on/.test(key)) {
            const invokers = el._vei || (el._vei = {})
            let invoker = invokers[key]
            const name = key.slice(2).toLowerCase()
            if (nextValue) {
                if (!invoker) {
                    invoker = el._vei[key] = (e) => {
                        // 如果 invoker.value 是数组，则遍历它并逐个调用事件处理函数
                        if (Array.isArray(invoker.value)) {
                            invoker.value.forEach(fn => fn(e))
                        } else {
                            // 否则直接作为函数调用
                            invoker.value(e)
                        }
                    }
                    invoker.value = nextValue
                    el.addEventListener(name, invoker)
                } else {
                    invoker.value = nextValue
                }
            } else if (invoker) {
                el.removeEventListener(name, invoker)
            }
        } else if (key === 'class') {
            el.className = nextValue || ''
        }
        else if (key === 'path') {
            el.texture = PIXI.Texture.from(nextValue)
        }
        else {
            el[key] = nextValue
        }
    }
    function patchChildren(n1, n2, container) {
        if (typeof n2.children === 'string') {
            if (Array.isArray(n1.children)) {
                n1.children.forEach((c) => unmount(c))
            }
            setElementText(container, n2.children)
        } else if (Array.isArray(n2.children)) {
            if (Array.isArray(n1.children)) {
                // 代码运行到这里，则说明新旧子节点都是一组子节点，这里涉及核心的Diff 算法
                // n1.children.forEach((c) => unmount(c))

                n2.children.forEach((c, idx) => patch(n1.children[idx], c, container))
            } else {
                setElementText(container, '')
                n2.children.forEach(c => patch(null, c, container))
            }
        } else {
            // 代码运行到这里，说明新子节点不存在
            // 旧子节点是一组子节点，只需逐个卸载即可
            if (Array.isArray(n1.children)) {
                n1.children.forEach(c => unmount(c))
            } else if (typeof n1.children === 'string') {
                // 旧子节点是文本子节点，清空内容即可
                setElementText(container, '')
            }
            // 如果也没有旧子节点，那么什么都不需要做
        }
    }
    function patch(n1, n2, container) {
        // 在这里编写渲染逻辑
        if (n1 && n2.type !== n1.type) {
            unmount(n1)
            n1 = null
        }
        // 代码运行到这里，证明 n1 和 n2 所描述的内容相同
        const { type } = n2
        // 如果 n2.type 的值是字符串类型，则它描述的是普通标签元素
        if (typeof type === 'string') {
            if (!n1) {
                mountElement(n2, container)
            } else {
                patchElement(n1, n2)
            }
        } else if (typeof type === 'object') {
            // 如果 n2.type 的值的类型是对象，则它描述的是组件
            if (!n1) {
                mountComponent(n2, container)
            } else {
                patchComponent(n1, n2)
            }
        } else if (type === 'xxx') {
            // 处理其他类型的 vnode
        }
    }
    function render(vnode, container) {
        if (vnode) {
            patch(container._vnode, vnode, container)
        } else {
            if (container._vnode) {
                unmount(container._vnode)
            }
        }
        container._vnode = vnode
    }
    return {
        render
    }
}

export default renderer
