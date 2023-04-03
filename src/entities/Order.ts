import { Product } from "./Product"

export interface IOrderItem {
    product_id: string,
    product_name: string,
    price: number,
    quantity: number
}

export interface IOrderResume {
    id: string,
    userName: string
    deliveryDate: Date
    shoppingList: {
        id: string,
        name: string,
        price: number,
        quantity: number
    }[],
    total: number
}

export class Order {

    private total: number = 0

    constructor(
        private id: string,
        private userName: string,
        private deliveryDate: Date,
        private shoppingList: IOrderItem[]
    ){}

    private calculateTotal = () => {
        const total = this.shoppingList.reduce(
            (acc, product) => acc + (product.price * product.quantity),
            0
        )

        return total
    }

    public getId = () => {
        return this.id
    }

    public getUserName = () => {
        return this.userName
    }

    public getDeliveryDate = () => {
        return this.deliveryDate
    }

    public getShoppingList = () => {
        return this.shoppingList
    }

    public setShoppingList = (newShoppingList: IOrderItem[]) => {
        this.shoppingList = newShoppingList
    }

    public getTotal = () => {
        return this.total
    }
}