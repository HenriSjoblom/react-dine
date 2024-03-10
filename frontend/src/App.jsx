import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

import store from'./utilities/store';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import ErrorPage from './pages/ErrorPage';
import RootLayout from './pages/RootLayout';
import OrderCart from './pages/OrderCart';
import './App.css'


const router = createBrowserRouter([
  {path: '/',
   element: <RootLayout/>,
   errorElement: <ErrorPage/>,
   children: [
    {index: true, element: <Home />},
    {path: '/menu', element: <Menu />},
    {path: '/ordercart', element: <OrderCart />},
    {path: '/checkout', element: <Checkout />}
    ]
  }
]);

function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
