import { Button, TextField } from "@mui/material"
import OrderSummary from "../../components/OrderSummary/OrderSummary"
import { FinishOrderButtonContainer, InputsContainer, OrderFormContainer, ScreenContainer } from "./styled"
import ReactDatePicker from "react-datepicker"
import { DateField } from "@mui/x-date-pickers"

const OrderForm = (props) => {
    const { cart, addToCart, removeFromCart, deleteFromCart, total, confirmOrder } = props

    return (
        <div>
            <ScreenContainer>
                <OrderFormContainer>
                <h2>Formulário do pedido</h2>
                <form>
                        <InputsContainer>
                            <TextField
                                name={"userName"}
                                label={"Nome"}
                                variant={"outlined"}
                                fullWidth
                                margin={"normal"}
                                required
                                type="text"

                            />

                            {/* conferir formato da data e colocar a label na parte de cima do field*/}
                            <TextField
                                name={"deliveryDate"}
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
                                // type={"submit"}
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