import { ThemeProvider } from "@mui/material/styles"
import theme from "./constants/theme"
import Header from "./components/Header/Header"
import ProductsFeed from "./screens/ProductsFeed/ProductsFeed"
import { useEffect, useState } from "react"
import styled from "styled-components"
import OrderForm from "./screens/OrderForm/OrderForm"
import { BASE_URL } from "./constants/urls"
import axios from "axios"

export const ScreensContainer = styled.div`
display: flex;
`

const App = () => {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    calculateTotal()
  }, [cart])

  // const handleCart = (cart) => {
  //   setCart(cart)
  // }

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

  const confirmOrder = async () => {

  }


  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ScreensContainer>
        <ProductsFeed addToCart={addToCart} />
        <OrderForm
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          deleteFromCart={deleteFromCart}
          total={total}
          confirmOrder={confirmOrder}
        />
      </ScreensContainer>

    </ThemeProvider>
  );
}


export default App;
