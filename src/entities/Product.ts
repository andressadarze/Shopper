export class Product {
    constructor(
        private id: string,
        private name: string,
        private price: number,
        private qty_stock: number
    ){}

    public getId = () => {
        return this.id
    }

    public getName = () => {
        return this.name
    }

    public getPrice = () => {
        return this.price
    }

    public getStock = () => {
        return this.qty_stock
    }

    public setPrice = (newPrice: number) => {
        this.price = newPrice
    }

    public setStock = (newStock: number) => {
        this.qty_stock = newStock
    }
}