import React from "react"
import { ContainerLi, ProductCartInformation, QuantityButtons } from "./styled"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from "@mui/material"
import { red } from "@mui/material/colors"


const OrderProductCard = (props) => {
    const { product, addToCart, removeFromCart, deleteFromCart } = props

    return (
        < ContainerLi>
            <h3>{product.name}</h3>
            <ProductCartInformation>
                <p>R${product.price}</p>
                <QuantityButtons>
                    <IconButton onClick={() => removeFromCart(product)}>
                        <RemoveCircleOutlineOutlinedIcon sx={{color: red[500]}}/>
                    </IconButton>

                    <p>{product.quantity}</p>

                    <IconButton onClick={() => addToCart(product)}>
                        <AddCircleOutlineOutlinedIcon 
                        color="primary"/>
                    </IconButton>

                    <IconButton onClick={() => deleteFromCart(product)}>
                        <DeleteIcon/>
                    </IconButton>

                </QuantityButtons>
            </ProductCartInformation>

        </ ContainerLi>
    )
}

export default OrderProductCard