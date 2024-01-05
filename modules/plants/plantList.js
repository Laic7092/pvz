// 这里列出植物的基本信息，方便在后续选择植物，图鉴页面，顶部植物栏中使用
const plantList = [
    { name: 'sunFlower', cost: 50, cd: 10, baseSpritePath: '/assets/img/sunFlower.webp', mannerism: 'day', env: 'ground' },
    { name: 'shoot', cost: 100, cd: 10, baseSpritePath: '/assets/img/shoot.webp', mannerism: 'all', env: 'ground' },
]

const plantMap = new Map()
plantList.forEach(plant => {
    const { name } = plant
    plantMap.set(name, plant)
})

export default plantMap
