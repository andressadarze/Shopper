import ProductBusiness from "../business/ProductBusiness";
import { Request, Response } from "express"
import { BaseError } from "../errors/BaseError";

class ProductController {
    constructor(
        private productBusiness: ProductBusiness
    ){}

    public getProducts = async (req: Request, res: Response) => {
        try {
            const response = await this.productBusiness.getProducts()

            res.status(200).send(response)

        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao buscar produtos" })
        }
    }
}

export default ProductController