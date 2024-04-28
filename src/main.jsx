import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/assets/styles/bootstrap.custom.css"
import "../src/assets/styles/index.css"
import { Provider } from 'react-redux'
import store from "./Store.js"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeScreen from './Screens/HomeScreen.jsx'
import { ProductScreen } from './Screens/ProductScreen.jsx'
import { CartScreen } from './Screens/CartScreen.jsx'
import { LoginScreen } from './Screens/LoginScreen.jsx'
import { RegisterScreen } from './Screens/RegisterScreen.jsx'
import { ShippingScreen } from './Screens/ShippingScreen.jsx'
import { PrivateRoute } from './Components/PrivateRoute.jsx'
import { AdminRoute } from './Components/AdminRoute.jsx'
import { PaymentScreen } from './Screens/PaymentScreen.jsx'
import { PlaceOrderScreen } from './Screens/PlaceOrderScreen.jsx'
import { OrderScreen } from './Screens/OrderScreen.jsx'
import { OrderListScreen } from './Screens/OrderListScreen.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<App />}>
            <Route index={true} element={<HomeScreen />} />
            <Route path='product/:id' element={<ProductScreen />} />
            <Route path='cart' element={<CartScreen />} />
            <Route path='login' element={<LoginScreen />} />
            <Route path="register" element={<RegisterScreen />} />

            <Route path='' element={<PrivateRoute />}>
              <Route path='/shipping' element={<ShippingScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/order/:id' element={<OrderScreen />} />
            </Route>
            <Route path='' element={<AdminRoute />}>
              <Route path='admin/orderlist' element={<OrderListScreen />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode >,
)
