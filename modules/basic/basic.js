export class Size2D {
    width
    height
    constructor({ width, height } = {}) {
        this.width = width
        this.height = height
    }
}

export class Vector2 {
    x
    y
    constructor({ x, y } = { x: 0, y: 0 }) {
        this.x = x
        this.y = y
    }
}

export class Renderer {
    enabled
    position
    size
    constructor(position = new Vector2(), size = new Size2D()) {
        this.enabled = true
        this.position = position
        this.size = size
    }
}

export class Interaction {
    eventMode
    eventType
    enabled
    constructor(eventMode = 'static', eventType = 'pointerdown', callBack) {
        this.enabled = true
        this.eventMode = eventMode
        this.eventType = eventType
        this.callBack = callBack
    }
}


// Property	Description
// position	X- and Y-position are given in pixels and change the position of the object relative to its parent, also available directly as object.x / object.y
// rotation	Rotation is specified in radians, and turns an object clockwise (0.0 - 2 * Math.PI)
// angle	Angle is an alias for rotation that is specified in degrees instead of radians (0.0 - 360.0)
// pivot	Point the object rotates around, in pixels - also sets origin for child objects
// alpha	Opacity from 0.0 (fully transparent) to 1.0 (fully opaque), inherited by children
// scale	Scale is specified as a percent with 1.0 being 100% or actual-size, and can be set independently for the x and y axis
// skew	Skew transforms the object in x and y similar to the CSS skew() function, and is specified in radians
// visible	Whether the object is visible or not, as a boolean value - prevents updating and rendering object and children
// renderer	Whether the object should be rendered - when false, object will still be updated, but won't be rendered, doesn't affect children