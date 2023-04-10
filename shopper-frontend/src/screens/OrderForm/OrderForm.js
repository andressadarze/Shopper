import { Button, TextField } from "@mui/material";
import OrderSummary from "../../components/OrderSummary/OrderSummary"
import { FinishOrderButtonContainer, InputsContainer, OrderFormContainer, ScreenContainer } from "./styled"
import React from "react"
import useForm from "../../hooks/useForm";


const OrderForm = (props) => {
    const { cart, addToCart, removeFromCart, deleteFromCart, total, confirmOrder } = props

    const [ form, onChange, clear ] = useForm({userName: "", deliveryDate: ""})

    const onSubmitForm = (event) => {
        event.preventDefault()
        confirmOrder(form, clear)
    }

    return (
        <div>
            <ScreenContainer>
                <OrderFormContainer>
                <h2>Formulário do pedido</h2>
                <form onSubmit={onSubmitForm}>
                        <InputsContainer>
                            <TextField
                                name={"userName"}
                                value={form.userName}
                                onChange={onChange}
                                label={"Nome"}
                                variant={"outlined"}
                                fullWidth
                                margin={"normal"}
                                required
                                type="text"

                            />
                            <TextField
                                name={"deliveryDate"}
                                value={form.deliveryDate}
                                onChange={onChange}
                                variant={"outlined"}
                                fullWidth
                                margin={"normal"}
                                required
                                type="date"

                            />
                            <OrderSummary
                                cart={cart}
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                                deleteFromCart={deleteFromCart}
                                total={total}
                            />
                        </InputsContainer>

                        <FinishOrderButtonContainer>
                            <Button
                                type={"submit"}
                                fullWidth
                                variant={"contained"}
                                color={"primary"}
                            >
                                Finalizar Pedido
                            </Button>
                        </FinishOrderButtonContainer>

                    </form>
                </OrderFormContainer>
            </ScreenContainer>

        </div>
    )
}

export default OrderForm