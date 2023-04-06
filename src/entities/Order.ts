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

export interface IGetOrderProductsDB {
    product_id: string,
    product_name: string,
    quantity: number,
    price: number
}

// export interface IGetOrdersDB {
//     id: string,
//     user_name: string,
//     delivery_date: Date,
//     product_id: string,
//     quantity: number,
//     product_name: string,
//     price: number
// }

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
        productName: string,
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
        this.total = this.calculateTotal()
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

export interface IGetOrdersOutputDTO {
    orders: IOrderResume[]
}