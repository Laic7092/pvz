class MyContainer {
    tag = 'container'
    name
    props
    children
    constructor({ props, children, name } = {}) {
        this.props = props
        this.children = children
        this.name = name
    }
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

const selectBar = new MyContainer({
    name: 'selectBar',
    props: {
        width: 1000,
        height: 1000,
        position: {
            x: 0,
            y: 0
        }
    },
    children: new Array(1).fill(0).map(() => new MySprite(
        {
            props: getDefaultProps()
        }
    ))
})
// console.log(selectBar)

function getDefaultProps() {
    return {
        // width: 40,
        // height: 40,
        path: 'test.png',
        position: {
            x: 0,
            y: 0
        }
    }
}

export {
    selectBar
}
