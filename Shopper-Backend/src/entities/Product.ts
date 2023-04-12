export interface IProductDB {
    id: string,
    name: string,
    price: number,
    qty_stock: number,
    image_url: string
}


export class Product {
    constructor(
        private id: string,
        private name: string,
        private price: number,
        private qty_stock: number,
        private image_url: string
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

    public getImageUrl = () => {
        return this.image_url
    }

    public setPrice = (newPrice: number) => {
        this.price = newPrice
    }

    public setStock = (newStock: number) => {
        this.qty_stock = newStock
    }

    public setImageUrl = (newImageUrl: string) => {
        this.image_url = newImageUrl
    }
}

export interface IGetProductsOutputDTO {
    products: IProductDB[]
}