import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { BASE_URL } from "../../constants/urls"
import GlobalStateContext from "../../global/GlobalStateContex"


const StockPage = () => {
    const { states, setters, requests } = useContext(GlobalStateContext)

    useEffect(() => {
        requests.getProducts()
    })

    const stockList = states.products.map((product) => {
        return (
            <p key={product.id}>{product.name} : {product.qty_stock} </p>
        )
    })

    return (
        <div>
            {stockList}
        </div>
    )
}

export default StockPage