import React, { useContext } from "react"
import { ContainerLi, ProductCartInformation, QuantityButtons } from "./styled"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from "@mui/material"
import { red } from "@mui/material/colors"
import GlobalStateContext from "../../global/GlobalStateContex"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const OrderProductCard = (props) => {

    const { states, setters, requests } = useContext(GlobalStateContext)

    const { product } = props

    const notifyWarning = () => toast.warn('Quantidade selecionada indisponível no estoque!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handleClick = (product) => {
        requests.addToCart(product)
        if (product.quantity > product.stockQty) {
            notifyWarning()
        }  
    }

    return (
        <div>
            < ContainerLi>
                <h3>{product.name}</h3>
                <ProductCartInformation>
                    <p>R${product.price}</p>
                    <QuantityButtons>
                        <IconButton onClick={() => requests.removeFromCart(product)}>
                            <RemoveCircleOutlineOutlinedIcon sx={{ color: red[500] }} />
                        </IconButton>

                        <p>{product.quantity}</p>

                        <IconButton onClick={() => handleClick(product)}>
                            <AddCircleOutlineOutlinedIcon
                                color="primary" />
                        </IconButton>

                        <IconButton onClick={() => requests.deleteFromCart(product)}>
                            <DeleteIcon />
                        </IconButton>

                    </QuantityButtons>
                </ProductCartInformation>
            </ ContainerLi>
            <ToastContainer />
        </div>
    )
}

export default OrderProductCard