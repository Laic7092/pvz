export class Size2D {
    width
    height
    constructor({ width, height } = {}) {
        this.width = width
        this.height = height
    }
}

export class Renderable {
    enabled
    constructor() {
        this.enabled = true
    }
}

export class Interable {
    enabled
    type
    constructor(type,callBack) {
        this.enabled = true
        this.type =type
        this.callBack = callBack
    }
}