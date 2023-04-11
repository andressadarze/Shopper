import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from "../pages/HomePage/HomePage"
import StockPage from "../pages/StockPage/StockPage"

const Router = () => {
    return (<Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/estoque' element={<StockPage />} />
    </Routes>)
}

export default Router