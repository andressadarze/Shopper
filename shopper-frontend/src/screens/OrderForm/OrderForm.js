import { Button, TextField } from "@mui/material";
import OrderSummary from "../../components/OrderSummary/OrderSummary"
import { FinishOrderButtonContainer, InputsContainer, OrderFormContainer, ScreenContainer } from "./styled"
import React, { useContext, useEffect } from "react"
import useForm from "../../hooks/useForm";
import GlobalStateContext from "../../global/GlobalStateContex";
import OrderSuccessPopup from "../../components/OrderSuccessPopup/OrderSuccessPopup";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";


const OrderForm = () => {

    const { states, setters, requests } = useContext(GlobalStateContext)

    const [form, onChange, clear] = useForm({ userName: "", deliveryDate: "" })

    useEffect(() => {
        requests.calculateTotal()
    }, [states.cart])

    const confirmOrder = async (form, clear) => {

        const shoppingList = states.cart.map((product) => {
            const item = {
                productId: product.id,
                quantity: product.quantity
            }
            return item
        })

        const { userName, deliveryDate } = form

        const body = {
            userName,
            deliveryDate,
            shoppingList
        }

        axios.post(`${BASE_URL}/order/create`, body)
            .then((res) => {
                setters.setOrderSuccessPopupState({
                    isActive: true,
                    message: res.data.message,
                    summary: res.data.order
                })

                clear()

                setters.setCart([])
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }

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
                            <OrderSummary />

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
                {states.orderSuccessPopupState.isActive 
                    && 
                    <OrderSuccessPopup
                        order={states.orderSuccessPopupState.summary}
                        closePopup={requests.closeOrderSuccessPopup}
                    />
                }
            </ScreenContainer>

        </div>
    )
}

export default OrderForm