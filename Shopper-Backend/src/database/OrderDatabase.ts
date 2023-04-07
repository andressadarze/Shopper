import { IGetOrderProductsDB, IOrderDB, IOrderProductDB } from "../entities/Order";
import { BaseDatabase } from "./BaseDatabase";
import ProductDatabase from "./ProductDatabase";

class OrderDatabase extends BaseDatabase {
    public static TABLE_ORDERS = "Shopper_Orders"
    public static TABLLE_ORDERS_PRODUCTS = "Shopper_Orders_Products"

    public createOrder = async(order: IOrderDB) : Promise<void> => {
        await BaseDatabase
        .connection(OrderDatabase.TABLE_ORDERS)
        .insert(order)
    }

    public insertProductOnOrder = async(orderProduct: IOrderProductDB) : Promise<void> => {
        await BaseDatabase
        .connection(OrderDatabase.TABLLE_ORDERS_PRODUCTS)
        .insert(orderProduct)

        await BaseDatabase.connection.raw(`
            UPDATE ${ProductDatabase.TABLE_PRODUCTS} SET qty_stock = qty_stock - ${orderProduct.quantity} where id = ${orderProduct.product_id}
        `)
    }

    public getOrders = async() : Promise<IOrderDB[]> => {
        const ordersDB : IOrderDB[] = await BaseDatabase.connection(OrderDatabase.TABLE_ORDERS).select()

        return ordersDB
    }

    public getOrderById = async(id: string) : Promise<IOrderDB> => {
        const orderDB : IOrderDB[] = await BaseDatabase.connection(OrderDatabase.TABLE_ORDERS).select().where({ id })

        return orderDB[0]
    }

    public getProductsByOrder = async(orderId: string) : Promise<IGetOrderProductsDB[]> => {
        const productsDB = await BaseDatabase
        .connection.raw(`
            SELECT u.product_id, u.quantity, i.name AS product_name, i.price
            FROM ${OrderDatabase.TABLE_ORDERS} AS o
            JOIN ${OrderDatabase.TABLLE_ORDERS_PRODUCTS} AS u ON u.order_id = o.id
            JOIN ${ProductDatabase.TABLE_PRODUCTS} AS i ON u.product_id = i.id
            WHERE o.id = "${orderId}"
        `)

        return productsDB[0]
    }
}

export default OrderDatabase