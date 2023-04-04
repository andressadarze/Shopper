import OrderDatabase from "../database/OrderDatabase";
import ProductDatabase from "../database/ProductDatabase";
import { ICreateOrderInputDTO, ICreateOrderOutputDTO, IOrderDB, IOrderProduct, IOrderProductDB } from "../entities/Order";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { ParamsError } from "../errors/ParamsError";
import IdGenerator from "../services/IdGenerator";

class OrderBusiness {
    constructor(
        private orderDatabase: OrderDatabase,
        private productDatabase: ProductDatabase,
        private idGenerator: IdGenerator
    ) {}

    public createOrder = async(input: ICreateOrderInputDTO) : Promise<ICreateOrderOutputDTO> => {
        const { userName, deliveryDate, shoppingList } = input

        if(!userName || !deliveryDate || !shoppingList) {
            throw new ParamsError()
        }

        if(shoppingList.length === 0) {
            throw new ParamsError("Pedido vazio! Insira pelo menos um produto para realizar o pedido.")
        }

        const newDeliveryDate = new Date(deliveryDate)
        const today = Date.now()

        if(newDeliveryDate.getTime() < today) {
            throw new ParamsError("Não é possível inserir uma data anterior ou igual à atual.")
        }

        const orderProducts = shoppingList.map((product) => {
            if(product.quantity <= 0) {
                throw new ParamsError("Quantidade de produto inválida! Valor mínimo é 1.")
            }

            return {
                ...product,
                name: "",
                price: 0
            }
        })

        for (let product of orderProducts) {
            const productDB = await this.productDatabase.findProductById(product.productId)

            if(!productDB) {
                throw new NotFoundError("Produto não cadastrado na loja.")
            }

            if(product.quantity > productDB.qty_stock) {
                throw new ConflictError("A quantidade solicitada não está disponível no estoque.")
            }

            product.name = productDB.name
            product.price = productDB.price
        }

        const orderId = this.idGenerator.generate()

        const order : IOrderDB = {
            id: orderId,
            name: userName,
            delivery_date: newDeliveryDate
        }

        await this.orderDatabase.createOrder(order)

        for(let product of orderProducts) {
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
}

export default OrderBusiness