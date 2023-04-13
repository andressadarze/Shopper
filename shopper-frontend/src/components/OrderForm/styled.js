import styled from 'styled-components'
import { primaryColor } from '../../constants/colors'

export const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin-top: 10vh;
`

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 450px;
  align-items: center;
  margin-bottom: 20px;
`

export const OrderFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 450px;
  align-items: center;
  margin-bottom: 20px;
  
`
export const FinishOrderButtonContainer = styled.div`
  width: 80vw;
  max-width: 450px;
`

export const FormTitle = styled.h2`
  font-size: 1.7em;
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #00A978;
`

export const FormLabel = styled.h5`
font-size: medium;
font-family: Verdana, Geneva, Tahoma, sans-serif;
align-self: flex-start;
margin-left: 5px;
margin-bottom: 5px;
color: ${primaryColor};
`