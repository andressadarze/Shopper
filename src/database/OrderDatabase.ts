import { IOrderDB, IOrderProductDB } from "../entities/Order";
import { IProductDB } from "../entities/Product";
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
}

export default OrderDatabase