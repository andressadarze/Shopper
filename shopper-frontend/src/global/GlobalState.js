import React from 'react'
import axios from 'axios'
import GlobalStateContext from './GlobalStateContex'
import { useState } from 'react'
import { BASE_URL } from '../constants/urls'

const GlobalState = (props) => {

    const [cart, setCart] = useState([])

    const [total, setTotal] = useState(0)

    const [products, setProducts] = useState([])

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

    const getProducts = () => {
        axios.get(`${BASE_URL}/product`)
            .then((res) => {
                setProducts(res.data.products)
            })
            .catch((err) => {
                alert(err.message)
            })
    }

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


    const states = {
        cart,
        total,
        products,
        orderSuccessPopupState
    }

    const setters = {
        setCart,
        setTotal,
        setProducts,
        setOrderSuccessPopupState
    }

    const requests = { 
        getProducts,
        addToCart,
        removeFromCart,
        deleteFromCart,
        calculateTotal,
        closeOrderSuccessPopup
    }

    return (
        <GlobalStateContext.Provider value={{states, setters, requests}}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalState