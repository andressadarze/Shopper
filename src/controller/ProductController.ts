import ProductBusiness from "../business/ProductBusiness";
import { Request, Response } from "express"

class ProductController {
    constructor(
        private productBusiness: ProductBusiness
    ){}

    public getProducts = async (req: Request, res: Response) => {
        try {
            const response = await this.productBusiness.getProducts()

            res.status(200).send(response)

        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    }
}

export default ProductController