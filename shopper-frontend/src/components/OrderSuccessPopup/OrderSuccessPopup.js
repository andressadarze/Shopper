import { ContainerDiv } from "./styled"

const OrderSuccessPopup = (props) => {

    const { order, closePopup } = props

    return (
        <ContainerDiv>
            <div>
                <h2>Pedido realizado com sucesso!</h2>
                <h3>Resumo do pedido</h3>
                <p>Id do pedido: {order.id}</p>
                <p>Nome: {order.userName}</p>
                <p>Data de entrega: {order.deliveryDate}</p>
                {order.shoppingList.map((product) => (
                    <p key={product.id}>
                        { ` ${product.productName} - R$${product.price} X ${product.quantity} `}
                    </p>
                ))}
                <p> Total: R${order.total.toFixed(2)}</p>

                <span 
                    className="close-popup"
                    onClick={closePopup}
                >
                    X 
                </span>
            </div>

        </ContainerDiv>
    )
}

export default OrderSuccessPopup