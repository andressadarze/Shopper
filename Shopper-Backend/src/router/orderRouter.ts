import { Router } from "express"
import OrderController from "../controller/OrderController"
import OrderBusiness from "../business/OrderBusiness"
import ProductDatabase from "../database/ProductDatabase"
import OrderDatabase from "../database/OrderDatabase"
import IdGenerator from "../services/IdGenerator"

export const orderRouter = Router()

const orderController = new OrderController(
    new OrderBusiness(
        new OrderDatabase,
        new ProductDatabase,
        new IdGenerator
    )
)

orderRouter.post("/create", orderController.createOrder)
orderRouter.get("/", orderController.getOrders)
orderRouter.get("/:id", orderController.getOrderById)