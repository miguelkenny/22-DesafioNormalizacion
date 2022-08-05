const { faker } = require('@faker-js/faker')

faker.locale = 'es'

class ContenedorProductos {
    constructor() {

        this.products = []

        for (let i = 0; i < 5; i++) {
            this.products.push(
                {
                    id: i+1,
                    nombre: faker.commerce.productName(),
                    precio: Number(faker.commerce.price()),
                    url: faker.image.imageUrl(),
                }
            )
        }

    }

    getAllTest() {
        return this.products
    }
}

module.exports = ContenedorProductos