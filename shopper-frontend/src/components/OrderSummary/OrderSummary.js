import React, { useContext } from "react"
import OrderProductCard from "../OrderProductCard/OrderProductCard"
import GlobalStateContext from "../../global/GlobalStateContex"
import { ContainerSection } from "./styled"

const OrderSummary = () => {

    const { states, setters, requests } = useContext(GlobalStateContext)

    const summary = states.cart.map((product) => {
        return (
            <OrderProductCard 
                key={product.id}
                product={product}
            />
        )
    })

    return (
        <ContainerSection>
            <h1>Carrinho</h1>
            {summary}
            <h2>
                Total: R${states.total.toFixed(2)}
            </h2>
        </ContainerSection>
    )
}

export default OrderSummary