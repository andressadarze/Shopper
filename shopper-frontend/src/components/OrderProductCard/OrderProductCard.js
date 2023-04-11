import React, { useContext } from "react"
import { ContainerLi, ProductCartInformation, QuantityButtons } from "./styled"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from "@mui/material"
import { red } from "@mui/material/colors"
import GlobalStateContext from "../../global/GlobalStateContex"



const OrderProductCard = (props) => {

    const { requests } = useContext(GlobalStateContext)

    const { product } = props

    return (
        < ContainerLi>
            <h3>{product.name}</h3>
            <ProductCartInformation>
                <p>R${product.price}</p>
                <QuantityButtons>
                    <IconButton onClick={() => requests.removeFromCart(product)}>
                        <RemoveCircleOutlineOutlinedIcon sx={{color: red[500]}}/>
                    </IconButton>

                    <p>{product.quantity}</p>

                    <IconButton onClick={() => requests.addToCart(product)}>
                        <AddCircleOutlineOutlinedIcon 
                        color="primary"/>
                    </IconButton>

                    <IconButton onClick={() => requests.deleteFromCart(product)}>
                        <DeleteIcon/>
                    </IconButton>

                </QuantityButtons>
            </ProductCartInformation>

        </ ContainerLi>
    )
}

export default OrderProductCard