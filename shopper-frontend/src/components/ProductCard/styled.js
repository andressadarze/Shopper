import styled from "styled-components"
import { Card, CardContent } from "@mui/material"


export const ProductCardContainer = styled(Card)`
  width: 250px;
  margin: 10px
`

export const ProductCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin-left: 5px;
`
