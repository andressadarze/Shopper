import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from "../pages/HomePage/HomePage"
import StockPage from "../pages/StockPage/StockPage"
import OrderForm from '../screens/OrderForm/OrderForm'
import ProductsFeed from '../screens/ProductsFeed/ProductsFeed'

const Router = () => {
    return (<Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/estoque' element={<StockPage />} />
        {/* <Route exact path='/carrinho' element={} /> */}
    </Routes>)
}

export default Router