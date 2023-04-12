import styled from "styled-components";
import { primaryColor } from "../../constants/colors";

export const StockContainer = styled.div`
    width: 90%;
    gap: 15px;
    display: flex;
    padding: 10px;
    justify-content: center;
    border-bottom: 1px dashed ${primaryColor};
    margin-left: 3.5%;
`
export const ProductLabel = styled.h2`
    font-size: 16px;
    min-width: 80%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
`
export const ProductQty = styled.h2`
    font-size: 16px;
`
export const StockLabel = styled.h2`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
    color: ${primaryColor};
    min-width: 76%;
    margin-left: 3.5%;
`
export const StockTitleContainer = styled.div`
    display: flex;
    margin-left: 3.5%;
    width: 90%;
    gap: 15px;
    padding: 10px;
    justify-content: center;
`
export const QuantityTitle = styled.h2`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
    color: ${primaryColor};
`
