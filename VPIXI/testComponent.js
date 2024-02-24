const MyComponent = {
    name: 'MyComponent',
    // 用 data 函数来定义组件自身的状态 
    data() {
        return {
            foo: 'hello world'
        }
    },
    render() {
        return {
            type: 'container',
            children: [
                {
                    type: 'text',
                    props: {
                        text: `foo 的值是: ${this.foo}` // 在渲染函数内使用组件状态
                    }
                }
            ]
        }
    }
}