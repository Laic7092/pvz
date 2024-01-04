class BehaviourTree {
    constructor() {

    }
    attack() {

    }
    defend() {

    }
    util() {

    }
}

class Plant {
    health
    sprites
    curSprite
    cost
    cellSize = 1
    behaviourTree
    constructor() {

    }
}

class OneShoot extends Plant {
    name = 'OneShoot'
    constructor() {
        this.behaviourTree = new BehaviourTree()
    }
}