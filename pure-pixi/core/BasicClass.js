export class Vector2 {
    x
    y
    constructor(x = 0, y = 0) {
        if (typeof x !== "number" || x < 0) x = 0
        if (typeof y !== "number" || x < 0) y = 0
        Object.assign(this, { x, y })
    }
}

class MyContainer {
    type = 'container'
    name
    props
    state
    children
    constructor({ props, children, name, state } = {}) {
        if (Object.prototype.toString.call(props) !== '[object Object]') {
            props = {}
        }
        if (!props.position instanceof Vector2) {
            props.position = new Vector2()
        }
        Object.assign(this, { name, state, children, props })
        Array.isArray(children) && (this.children = this.flattening(children))
    }
    // 二维数组转一维
    flattening(children) {
        const res = []
        children.forEach(child => {
            if (Array.isArray(child)) {
                res.push(...child)
            } else {
                res.push(child)
            }
        });
        return res
    }
    // 渲染内容
    render() {
        const { type, props, children, state } = this
        return {
            type,
            props,
            state,
            children
        }
    }
}

class MySprite extends MyContainer {
    type = 'sprite'
    constructor(config) {
        super(config)
    }
}

class MyText extends MySprite {
    type = 'text'
    constructor(config) {
        super(config)
    }
}

export {
    MyContainer,
    MySprite,
    MyText
}