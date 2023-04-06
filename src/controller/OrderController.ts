import OrderBusiness from "../business/OrderBusiness"
import { Request, Response } from "express"
import { ICreateOrderInputDTO, IGetOrderByIdInputDTO } from "../entities/Order"
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
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao criar pedido" })
        }
    }

    public getOrders = async (req:Request, res: Response) => {
        try {
            const response = await this.orderBusiness.getOrders()
            res.status(200).send(response)
            
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao buscar pedidos." })
        }
    }

    public getOrderById = async(req:Request, res: Response) => {
        try {
            const id = req.params.id

            const input: IGetOrderByIdInputDTO = {
                id
            }
            const response = await this.orderBusiness.getOrderById(input)
            res.status(200).send(response)
    
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao busca pedido." })
        }
    }

}

export default OrderController