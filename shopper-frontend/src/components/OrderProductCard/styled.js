import styled from "styled-components"
import { primaryColor } from "../../constants/colors"

export const ContainerLi = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
border-bottom: 1px solid ${primaryColor};
padding-bottom: 20px;
    .h3 {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: ${primaryColor}
    }
`

export const ProductCartInformation = styled.div`
    display: flex;
    justify-content: space-between;
    width: 60vw;
    max-width: 450px;
`

export const QuantityButtons = styled.div`
    display: flex;
    justify-content: space-between;
`

export const ProductOrderInfo = styled.h4`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
`