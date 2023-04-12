import { Button, TextField } from "@mui/material";
import OrderSummary from "../../components/OrderSummary/OrderSummary"
import { FinishOrderButtonContainer, InputsContainer, OrderFormContainer, ScreenContainer } from "./styled"
import React, { useContext, useEffect, useState } from "react"
import useForm from "../../hooks/useForm";
import GlobalStateContext from "../../global/GlobalStateContex";
import OrderSuccessModal from "../OrderSuccessModal/OrderSuccessModal";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import { goToHome } from "../../routes/coordinator";


const OrderForm = () => {

    const navigate = useNavigate()

    const { states, setters, requests } = useContext(GlobalStateContext)

    const [form, onChange, clear] = useForm({ userName: "", deliveryDate: "" })

    const [orderSuccessModalState, setOrderSuccessModalState] = useState({
        isActive: false,
        message: null,
        summary: {
            id: null,
            userName: null,
            deliveryDate: null,
            shoppingList: null,
            total: null
        }
    })

    const closeOrderSuccessModal = () => {
        setOrderSuccessModalState({
            isActive: false,
            message: null,
            summary: {
                id: null,
                userName: null,
                deliveryDate: null,
                shoppingList: null,
                total: null
            }
        })
        goToHome(navigate)
    }

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
                setOrderSuccessModalState({
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
                {orderSuccessModalState.isActive 
                    && 
                    <OrderSuccessModal
                        orderSuccessModal={orderSuccessModalState}
                        closeModal={closeOrderSuccessModal}
                    />
                }
            </ScreenContainer>

        </div>
    )
}

export default OrderForm