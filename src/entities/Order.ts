export interface IOrderDB {
    id: string,
    name: string,
    delivery_date: Date
}

export interface IOrderProductDB {
    order_id: string,
    product_id: string,
    quantity: number
}

export interface IOrderProduct {
    productId: string,
    productName: string,
    quantity: number,
    price: number
}

export interface IOrderResume {
    id: string,
    userName: string
    deliveryDate: string
    shoppingList: {
        productId: string,
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
        private shoppingList: IOrderProduct[]
    ) {
        this.total = this.calculateTotal()
    }

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

    public setShoppingList = (newShoppingList: IOrderProduct[]) => {
        this.shoppingList = newShoppingList
    }

    public getTotal = () => {
        return this.total
    }
}

export interface ICreateOrderInputDTO {
    userName: string,
    deliveryDate: string,
    shoppingList: {
        productId: string,
        quantity: number
    }[]
}

export interface ICreateOrderOutputDTO {
    message: string,
    order: IOrderResume
}