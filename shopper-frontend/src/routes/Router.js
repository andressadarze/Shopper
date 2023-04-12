import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import StockPage from "../pages/StockPage/StockPage"
import OrderForm from '../components/OrderForm/OrderForm'
import ProductsFeed from '../components/ProductsFeed/ProductsFeed'
import HomePage from '../pages/HomePage/HomePage'

const Router = () => {
    return (<Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/estoque' element={<StockPage />} />
        <Route exact path='/carrinho' element={<OrderForm />} />
    </Routes>)
}

export default Router