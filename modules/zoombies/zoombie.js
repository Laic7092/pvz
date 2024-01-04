class BehaviourTree {
    constructor() {

    }
    attack() {

    }
    walk() {

    }
    run() {

    }
    eat() {

    }
}

class Zoombie {
    health
    sprites
    curSprite
    behaviourTree
    constructor() {

    }

}

class CommonZombie extends Zoombie {
    constructor() {
        this.behaviourTree = new BehaviourTree()
    }
}