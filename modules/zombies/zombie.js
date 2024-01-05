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

class Zombie {
    health
    sprites
    curSprite
    behaviourTree
    constructor() {

    }

}

class CommonZombie extends Zoombie {
    name = 'commonZombie'
    constructor() {
        this.behaviourTree = new BehaviourTree()
    }
}