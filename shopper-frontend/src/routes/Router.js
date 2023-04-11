import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import StockPage from "../pages/StockPage/StockPage"
import OrderForm from '../screens/OrderForm/OrderForm'
import ProductsFeed from '../screens/ProductsFeed/ProductsFeed'

const Router = () => {
    return (<Routes>
        <Route exact path='/' element={<ProductsFeed />} />
        <Route exact path='/estoque' element={<StockPage />} />
        <Route exact path='/carrinho' element={<OrderForm />} />
    </Routes>)
}

export default Router