import ProductDatabase from "../database/ProductDatabase";
import { IGetProductsOutputDTO, Product } from "../entities/Product";
import { ParamsError } from "../errors/ParamsError";

class ProductBusiness {
    constructor(
        private productDatabase: ProductDatabase
    ){}

    public getProducts = async() : Promise<IGetProductsOutputDTO> => {
        const productsDB = await this.productDatabase.getProducts()

        if(productsDB.length === 0) {
            throw new ParamsError("Não há produtos cadastrados em estoque")
        }

        const products = productsDB.map(productDB => {
            const product = new Product(
                productDB.id ,
                productDB.name ,
                productDB.price ,
                productDB.qty_stock,
                productDB.image_url
            )

            const newProduct = {
                id: product.getId(),
                name: product.getName(),
                price: product.getPrice(),
                qty_stock: product.getStock(),
                image_url: product.getImageUrl()
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