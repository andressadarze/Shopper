import OrderDatabase from "../database/OrderDatabase";
import ProductDatabase from "../database/ProductDatabase";
import { ICreateOrderInputDTO, ICreateOrderOutputDTO, IGetOrderByIdInputDTO, IGetOrderByIdOutputDTO, IGetOrderProductsDB, IGetOrdersOutputDTO, IOrderDB, IOrderProduct, IOrderProductDB, Order } from "../entities/Order";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { ParamsError } from "../errors/ParamsError";
import IdGenerator from "../services/IdGenerator";

class OrderBusiness {
    constructor(
        private orderDatabase: OrderDatabase,
        private productDatabase: ProductDatabase,
        private idGenerator: IdGenerator
    ) { }

    public createOrder = async (input: ICreateOrderInputDTO): Promise<ICreateOrderOutputDTO> => {
        const { userName, deliveryDate, shoppingList } = input

        if (!userName || !deliveryDate || !shoppingList) {
            throw new ParamsError()
        }

        if (shoppingList.length === 0) {
            throw new ParamsError("Pedido vazio! Insira pelo menos um produto para realizar o pedido.")
        }

        const newDeliveryDate = new Date(deliveryDate)
        const today = Date.now()

        if (newDeliveryDate.getTime() < today) {
            throw new ParamsError("Não é possível inserir uma data anterior ou igual à atual.")
        }

        const orderProducts = shoppingList.map((product) => {
            if (product.quantity <= 0) {
                throw new ParamsError("Quantidade de produto inválida! Valor mínimo é 1.")
            }

            return {
                ...product,
                productName: "",
                price: 0
            }
        })

        for (let product of orderProducts) {
            const productDB = await this.productDatabase.findProductById(product.productId)

            if (!productDB) {
                throw new NotFoundError("Produto não cadastrado na loja.")
            }

            if (product.quantity > productDB.qty_stock) {
                throw new ConflictError(`Quantidade de produto indisponível no estoque.`)
            }

            product.productName = productDB.name
            product.price = productDB.price
        }

        const orderId = this.idGenerator.generate()

        const order: IOrderDB = {
            id: orderId,
            name: userName,
            delivery_date: newDeliveryDate
        }

        await this.orderDatabase.createOrder(order)

        for (let product of orderProducts) {
            const orderProduct: IOrderProductDB = {
                order_id: orderId,
                product_id: product.productId,
                quantity: product.quantity
            }

            await this.orderDatabase.insertProductOnOrder(orderProduct)
        }

        const total = orderProducts.reduce(
            (acc, product) => (acc + (product.price * product.quantity)),
            0
        )

        const response: ICreateOrderOutputDTO = {
            message: "Pedido realizado com sucesso!",
            order: {
                id: orderId,
                userName,
                deliveryDate: deliveryDate,
                shoppingList: orderProducts,
                total
            }
        }

        return response

    }

    public getOrders = async (): Promise<IGetOrdersOutputDTO> => {
        const ordersDB = await this.orderDatabase.getOrders()

        if (ordersDB.length === 0) {
            throw new ParamsError("Não há pedidos cadastrados no sistema")
        }

        const orders: Order[] = []

        for (let orderDB of ordersDB) {
            const order = new Order(
                orderDB.id,
                orderDB.name,
                orderDB.delivery_date,
                []
            )

            const orderProductsDB: IGetOrderProductsDB[] = await this.orderDatabase.getProductsByOrder(order.getId())

            const shoppingList = orderProductsDB.map(productDB => {
                const orderProduct: IOrderProduct = {
                    productId: productDB.product_id,
                    productName: productDB.product_name,
                    quantity: productDB.quantity,
                    price: productDB.price
                }
                return orderProduct
            })

            order.setShoppingList(shoppingList)

            orders.push(order)
        }

        const response: IGetOrdersOutputDTO = {
            orders: orders.map((order) => ({
                id: order.getId(),
                userName: order.getUserName(),
                deliveryDate: order.formatDate(order.getDeliveryDate()),
                shoppingList: order.getShoppingList(),
                total: order.getTotal()
            }))
        }

        return response
    }

    public getOrderById = async (input: IGetOrderByIdInputDTO): Promise<IGetOrderByIdOutputDTO> => {
        const id = input.id
        const orderDB = await this.orderDatabase.getOrderById(id)

        if (!orderDB) {
            throw new ParamsError("Pedido não identificado no sistema.")
        }

        const order = new Order(
            orderDB.id,
            orderDB.name,
            orderDB.delivery_date,
            []
        )

        const orderProductsDB: IGetOrderProductsDB[] = await this.orderDatabase.getProductsByOrder(order.getId())

        const shoppingList = orderProductsDB.map(productDB => {
            const orderProduct: IOrderProduct = {
                productId: productDB.product_id,
                productName: productDB.product_name,
                quantity: productDB.quantity,
                price: productDB.price
            }
            return orderProduct
        })

        order.setShoppingList(shoppingList)

        const response: IGetOrderByIdOutputDTO = {
            order: {
                id: order.getId(),
                userName: order.getUserName(),
                deliveryDate: order.formatDate(order.getDeliveryDate()),
                shoppingList: order.getShoppingList(),
                total: order.getTotal()
            }
        }
        return response
    }
}

export default OrderBusiness