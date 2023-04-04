import OrderBusiness from "../business/OrderBusiness"
import { Request, Response } from "express"
import { ICreateOrderInputDTO } from "../entities/Order"
import { BaseError } from "../errors/BaseError"

class OrderController {
    constructor(
        private orderBusiness: OrderBusiness
    ){}

    public createOrder = async (req: Request, res: Response) => {
        try {
            const {userName, deliveryDate, shoppingList} = req.body

            const input: ICreateOrderInputDTO = {
                userName,
                deliveryDate,
                shoppingList
            }

            const response = await this.orderBusiness.createOrder(input)

            res.status(201).send(response)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao criar pedido" })
        }
    }
}

export default OrderController