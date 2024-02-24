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
document.body.insertBefore
const renderer = createRenderer({
    createElement(type) {
        console.log(`创建元素 ${type}`)
        return baseType.get(type)()
    },
    insert(el, parent, anchor = null) {
        console.log(`将 ${el} 添加到${parent} 下`)
        parent.insertBefore(el, anchor)
    }
})

function createRenderer(options) {
    const {
        createElement,
        insert
    } = options
    function unmount(vnode) {
        // 还可以调用其他操作   
        const parent = vnode.el.parentNode
        if (parent) {
            parent.removeChild(vnode.el)
        }
    }
    function mountElement(vnode, container, anchor) {
        const el = vnode.el = createElement(vnode.type)
        if (Array.isArray(vnode.children)) {
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
        insert(el, container, anchor)
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
        patchElement(n1, n2)
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
                    el.on(name, invoker)
                } else {
                    invoker.value = nextValue
                }
            } else if (invoker) {
                el.off(name, invoker)
            }
        } else if (key === 'path') {
            el.texture = PIXI.Texture.from(nextValue)
        }
        else {
            el[key] = nextValue
        }
    }
    function patchChildren(n1, n2, container) {
        if (Array.isArray(n2.children)) {
            if (Array.isArray(n1.children)) {
                const oldChildren = n1.children
                const newChildren = n2.children

                for (let index = 0; index < 1000; index++) {
                    patch(newChildren[index], oldChildren[index], container)
                }
                return
                let lastIndex = 0

                // 旧的节点的序号是递增序列，0，1，2；出现新节点，匹配出来如果也是递增序列就不需要移动？
                // 如果0，1，2 -> 2，0，1
                for (let i = 0; i < newChildren.length; i++) {
                    const newVNode = newChildren[i]
                    let j = 0
                    // 在第一层循环中定义变量 find，代表是否在旧的一组子节点中找到可复用的节点， 
                    // 初始值为 false，代表没找到 
                    let find = false
                    for (j; j < oldChildren.length; j++) {
                        const oldVNode = oldChildren[j]
                        if (newVNode.key === oldVNode.key) {
                            // 一旦找到可复用的节点，则将变量 find 的值设为 true 
                            find = true
                            patch(oldVNode, newVNode, container)
                            if (j < lastIndex) {
                                const prevVNode = newChildren[i - 1]
                                if (prevVNode) {
                                    const anchor = prevVNode.el.nextSibling
                                    insert(newVNode.el, container, anchor)
                                }
                            } else {
                                lastIndex = j
                            }
                            break
                        }
                    }
                    // 如果代码运行到这里，find 仍然为 false， 
                    // 说明当前 newVNode 没有在旧的一组子节点中找到可复用的节点 
                    // 也就是说，当前 newVNode 是新增节点，需要挂载 
                    if (!find) {
                        // 为了将节点挂载到正确位置，我们需要先获取锚点元素 
                        // 首先获取当前 newVNode 的前一个 vnode 节点 
                        const prevVNode = newChildren[i - 1]
                        let anchor = null
                        if (prevVNode) {
                            // 如果有前一个 vnode 节点，则使用它的下一个兄弟节点作为锚点元素 
                            anchor = prevVNode.el.nextSibling
                        } else {
                            // 如果没有前一个 vnode 节点，说明即将挂载的新节点是第一个子节点 
                            // 这时我们使用容器元素的 firstChild 作为锚点 
                            anchor = container.firstChild
                        }
                        // 挂载 newVNode 
                        patch(null, newVNode, container, anchor)
                    }
                }

                // 上一步的更新操作完成后 
                // 遍历旧的一组子节点 
                for (let i = 0; i < oldChildren.length; i++) {
                    const oldVNode = oldChildren[i]
                    // 拿旧子节点 oldVNode 去新的一组子节点中寻找具有相同 key 值的节点 
                    const has = newChildren.find(
                        vnode => vnode.key === oldVNode.key
                    )
                    if (!has) {
                        // 如果没有找到具有相同 key 值的节点，则说明需要删除该节点 
                        // 调用 unmount 函数将其卸载 
                        unmount(oldVNode)
                    }
                }
            } else {
                n2.children.forEach(c => patch(null, c, container))
            }
        } else {
            // 代码运行到这里，说明新子节点不存在
            // 旧子节点是一组子节点，只需逐个卸载即可
            if (Array.isArray(n1.children)) {
                n1.children.forEach(c => unmount(c))
            }
        }
    }
    function patch(n1, n2, container, anchor) {
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
                mountElement(n2, container, anchor)
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
