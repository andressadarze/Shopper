import ProductDatabase from "../database/ProductDatabase";
import { IGetProductsOutputDTO, Product } from "../entities/Product";

class ProductBusiness {
    constructor(
        private productDatabase: ProductDatabase
    ){}

    public getProducts = async() : Promise<IGetProductsOutputDTO> => {
        const productsDB = await this.productDatabase.getProducts()

        const products = productsDB.map(productDB => {
            const product = new Product(
                productDB.id ,
                productDB.name ,
                productDB.price ,
                productDB.qty_stock ,
            )

            const newProduct = {
                id: product.getId(),
                name: product.getName(),
                price: product.getPrice(),
                qty_stock: product.getStock()
            }

            return newProduct
        })

        const response : IGetProductsOutputDTO = {
            products
        }

        return response
    }
}

export default ProductBusiness