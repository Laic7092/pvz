# 虚拟DOM，响应式再加组件化结合PIXIJS方案
首先需要知道的是，pixijs是渲染引擎，假设把游戏页面视为一颗组件树，那么pxijs的app就是根组件。
现在的情况是，我有自己内部的对象，并且我也需要内部的对象。
就拿我写的selectbar为例子来看
## 组件化
按照组件化来看（我不会用声明式，尽可能简单。。这一步不存在只是为了理解）
一个组件必须包含一个渲染函数，即 render 函数，并且渲染函数的返回值应该是虚拟 DOM。
```html
<!-- ”编译“前的组件 -->
<selectbar>
    <card><card/>
    <card><card/>
    <card><card/>
    <!-- 很多卡片 -->
</selectbar>

<card>
    <img/>
    <!-- 其他？ -->
<card/>
```
## 虚拟DOM
需要注意的是，pixijs没有css那么方便的样式，需要手动设置宽高，位置

```javascript
// “编译“后的组件
const Card = {
    render() {
        return {
            tag: 'sprite',
            props: {
                path: '/img/foo.jpg',
                width: 100,
                height: 100,
                position: {
                    x: 0,
                    y: 0
                }
            }
        }
    }
}

const SelectBar = {
    render() {
        return {
            tag: 'container',
            props: {
                width: 500,
                height: 100,
                position: {
                    x: 0,
                    y: 0
                }
            },
            children: [
                { tag: Card },
                { tag: Card },
                { tag: Card },
                // 很多卡片
            ]
        }
    }
}
```
## 渲染器
最后是”渲染“

```javascript
function createPIXIObject() {
    return {}
}


export function renderer(vnode, container) {
    if (typeof vnode.tag === 'string') {
        // 说明 vnode 描述的是标签元素
        mountElement(vnode, container);
    } else if (typeof vnode.tag === 'object') {
        // 对象加render函数
        mountComponent(vnode, container);
    }
}
function mountElement(vnode, container) {
    const { tag, props, children } = vnode;
    if (typeof tag !== 'string')
        return;
    const el = createPIXIObject(tag, props)
    // 这里是dom中的写法，需要变更为PIXI里的
    // const el = document.createElement(tag);
    // for (const key in props) {
    //     if (Object.prototype.hasOwnProperty.call(props, key)) {
    //         if (/^on/.test(key)) {
    //             el.addEventListener(key.substring(2), props[key]);
    //         }
    //     }
    // }
    // if (typeof children === 'string') {
    //     el.appendChild(document.createTextNode(children));
    // }
    else if (Array.isArray(children)) {
        children.forEach(child => renderer(child, el));
    }
    container.appendChild(el);
}
function mountComponent(vnode, container) {
    const { tag } = vnode;
    if (typeof tag !== 'object')
        return;
    const subtree = tag.render();
    renderer(subtree, container);
}
```
## 更为重要的，响应式
首先脑内模拟一下步骤
1. 我有一个SelectBar对象，这个对象实现了渲染函数
2. 我的渲染器拿到了SelectBar，然后生成PIXI内部对象并添加到app.stage（根组件）
3. 假设，现在某个卡片的图片路径变了，该如何更新？

### 不能完美替换的

> 很遗憾的说，PIXIJS内部的图片和文本不能像DOM一样随意修改，貌似是所谓的`texture`，都是像素点来这。如果我更改文本内容，或者切换图片的路径并不会有我想的效果。取而代之的是`PIXIJS`里的loader，我可能需要异步加载图片资源，并且管理。

下面的代码摘录自pixijs官网，可以发现所谓的切换图片，需要切换texture属性，切换文字？或许就需要重新生成了。


```javascript
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });

document.body.appendChild(app.view);

let isFlower = true;

const texture = PIXI.Texture.from('https://pixijs.com/assets/flowerTop.png');
const secondTexture = PIXI.Texture.from('https://pixijs.com/assets/eggHead.png');

// create a new Sprite using the texture
const character = new PIXI.Sprite(texture);
app.stage.addChild(character);
app.ticker.add(() =>
{
    isFlower = !isFlower
    character.texture = isFlower ? texture : secondTexture;
});
```

### 可以随意修改的

这也是复制来的，最基础的就是position还有scale。没有width，height是因为PIXI内部还是通过scale设置的，输入的宽高是经过计算和转换后的scale。还有那种提示条（可以通过visible和renderble控制）

| Property       | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| **position**   | X- and Y-position are given in pixels and change the position of the object relative to its parent, also available directly as `object.x` / `object.y` |
| **rotation**   | Rotation is specified in radians, and turns an object clockwise (0.0 - 2 * Math.PI) |
| **angle**      | Angle is an alias for rotation that is specified in degrees instead of radians (0.0 - 360.0) |
| **pivot**      | Point the object rotates around, in pixels - also sets origin for child objects |
| **alpha**      | Opacity from 0.0 (fully transparent) to 1.0 (fully opaque), inherited by children |
| **scale**      | Scale is specified as a percent with 1.0 being 100% or actual-size, and can be set independently for the x and y axis |
| **skew**       | Skew transforms the object in x and y similar to the CSS skew() function, and is specified in radians |
| **visible**    | Whether the object is visible or not, as a boolean value - prevents updating and rendering object and children |
| **renderable** | Whether the object should be rendered - when `false`, object will still be updated, but won't be rendered, doesn't affect children |

