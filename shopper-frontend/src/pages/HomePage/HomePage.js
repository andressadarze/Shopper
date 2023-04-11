import React from "react"
import ProductsFeed from "../../screens/ProductsFeed/ProductsFeed"
import OrderForm from "../../screens/OrderForm/OrderForm"
import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import OrderSuccessPopup from "../../components/OrderSuccessPopup/OrderSuccessPopup"
import { BASE_URL } from "../../constants/urls"

export const HomePageContainer = styled.div`
display: flex;
`

const HomePage = () => {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)

    const [orderSuccessPopupState, setOrderSuccessPopupState] = useState({
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

    useEffect(() => {
        calculateTotal()
    }, [cart])


    const addToCart = (productToAdd) => {

        const foundIndex = cart.findIndex((productInCart) => {
            return productInCart.id === productToAdd.id
        })

        if (foundIndex >= 0) {
            const newCart = [...cart]
            newCart[foundIndex].quantity += 1

            setCart(newCart)

        } else {
            const newCart = [...cart]
            const newProduct = {
                id: productToAdd.id,
                name: productToAdd.name,
                price: productToAdd.price,
                quantity: 1
            }

            newCart.push(newProduct)

            setCart(newCart)
        }
    }

    const removeFromCart = (productToRemove) => {
        if (productToRemove.quantity > 1) {

            const newCart = cart.map((product) => {
                if (product.id === productToRemove.id) {
                    product.quantity -= 1
                }

                return product
            })
            setCart(newCart)
        } else {
            const newCart = cart.filter((product) => {
                return product.id !== productToRemove.id
            })

            setCart(newCart)
        }
    }

    const deleteFromCart = (productToDelete) => {
        const newCart = cart.filter((product) => {
            return product.id !== productToDelete.id
        })

        setCart(newCart)
    }

    const calculateTotal = () => {
        const total = cart.reduce(
            (acc, item) => acc + (item.price * item.quantity),
            0
        )

        setTotal(total)
    }

    const confirmOrder = async (form, clear) => {

        const shoppingList = cart.map((product) => {
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

                console.log(res.data)
                setOrderSuccessPopupState({
                    isActive: true,
                    message: res.data.message,
                    summary: res.data.order
                })

                clear()

                setCart([])
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }

    const closeOrderSuccessPopup = () => {
        setOrderSuccessPopupState({
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
    }

    return (
        <HomePageContainer>
            <ProductsFeed addToCart={addToCart} />
            <OrderForm
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                deleteFromCart={deleteFromCart}
                total={total}
                confirmOrder={confirmOrder}
            />
                {orderSuccessPopupState.isActive 
                    && 
                    <OrderSuccessPopup
                        order={orderSuccessPopupState.summary}
                        closePopup={closeOrderSuccessPopup}
                    />
                }
        </HomePageContainer>

    )
}

export default HomePage