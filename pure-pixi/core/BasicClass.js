export class Vector2 {
    x
    y
    constructor({ x, y } = { x: 0, y: 0 }) {
        this.x = x
        this.y = y
    }
}

class MyContainer {
    tag = 'container'
    name
    props
    children
    constructor({ props = {}, children, name } = {}) {
        this.name = name
        this.props = props
        // props.position || (props.position = new Vector2())
        props.position || (props.position = { x: 0, y: 0 })
        if (children)
            this.children = this.flattening(children)
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
        const { tag, props, children } = this
        return {
            tag,
            props,
            children
        }
    }
}

class MySprite extends MyContainer {
    tag = 'sprite'
    constructor(config) {
        super(config)
    }
}

class MyText extends MySprite {
    tag = 'text'
    constructor(config) {
        super(config)
    }
}

export {
    MyContainer,
    MySprite,
    MyText
}