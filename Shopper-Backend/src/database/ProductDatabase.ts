import { IProductDB } from "../entities/Product";
import { BaseDatabase } from "./BaseDatabase";

class ProductDatabase extends BaseDatabase {
    public static TABLE_PRODUCTS = "vw_Shopper_Products"

    public getProducts = async() : Promise<IProductDB[]> => {
        const result : IProductDB[] = await BaseDatabase
        .connection(ProductDatabase.TABLE_PRODUCTS)
        .select()

        return result
    }

    public findProductById = async (productId: string) : Promise<IProductDB> =>  {

        const result: IProductDB[] = await BaseDatabase
        .connection(ProductDatabase.TABLE_PRODUCTS)
        .select()
        .where({id: productId})

        return result[0]
    }
}

export default ProductDatabase