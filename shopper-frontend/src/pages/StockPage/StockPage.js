import React, { useContext, useEffect, useState } from "react"
import GlobalStateContext from "../../global/GlobalStateContex"
import { Box } from "@mui/material"
import * as styled from "./styled"


const StockPage = () => {
    const { states, setters, requests } = useContext(GlobalStateContext)

    useEffect(() => {
        requests.getProducts()
    })

    const stockList = states.products.map((product) => {
        return ( 
            <styled.StockContainer key={product.id}>

                <styled.ProductLabel>
                    {product.name}
                </styled.ProductLabel>

                <styled.ProductQty>
                    {product.qty_stock}
                </styled.ProductQty>


            </styled.StockContainer>
        )
    })

    return (
        <Box style={{justifyContent: "center", minWidth: "100%", padding:"30px"}}>
            <styled.StockTitleContainer>
                <styled.QuantityTitle>ESTOQUE</styled.QuantityTitle>
            </styled.StockTitleContainer>
            
            <styled.StockTitleContainer>
                <styled.StockLabel>
                    Produto
                </styled.StockLabel>

                <styled.QuantityTitle>
                    Quantidade
                </styled.QuantityTitle>
         
            </styled.StockTitleContainer>

            {stockList}
        </Box>
    )
}

export default StockPage