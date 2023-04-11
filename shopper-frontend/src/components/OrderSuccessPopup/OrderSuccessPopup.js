import { useContext } from "react"
import { ContainerDiv } from "./styled"
import GlobalStateContext from "../../global/GlobalStateContex"

const OrderSuccessPopup = () => {
    
    const { states, requests } = useContext(GlobalStateContext)

    const order = states.orderSuccessPopupState.summary

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
                    onClick={requests.closeOrderSuccessPopup}
                >
                    X 
                </span>
            </div>

        </ContainerDiv>
    )
}

export default OrderSuccessPopup