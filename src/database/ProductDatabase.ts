import { IProductDB } from "../entities/Product";
import { BaseDatabase } from "./BaseDatabase";

class ProductDatabase extends BaseDatabase {
    public static TABLE_PRODUCTS = "Shopper_Products"

    public getProducts = async() : Promise<IProductDB[]> => {
        const result : IProductDB[] = await BaseDatabase
        .connection(ProductDatabase.TABLE_PRODUCTS)
        .select()

        return result
    }

}

export default ProductDatabase