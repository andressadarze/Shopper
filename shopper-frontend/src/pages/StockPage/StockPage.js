import axios from "axios"
import React, { useEffect, useState } from "react"
import { BASE_URL } from "../../constants/urls"

const StockPage = () => {

    const [ products, setProducts ] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/product`)
        .then((res) => {
            setProducts(res.data.products)
        })
        .catch((err) => {
            alert(err.message)
        })
    })

    const stockList = products.map((product) => {
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