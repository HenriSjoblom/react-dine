import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import {QueryClient, QueryClientProvider} from 'react-query'

import store from'./utilities/store';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import ErrorPage from './pages/ErrorPage';
import RootLayout from './pages/RootLayout';
import OrderCart from './pages/OrderCart';
import Authenticate from './pages/Authenticate';
import Users from './pages/Users';
import './App.css'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {path: '/',
   element: <RootLayout/>,
   errorElement: <ErrorPage/>,
   children: [
    {index: true, element: <Home />},
    {path: '/menu', element: <Menu />},
    {path: '/ordercart', element: <OrderCart />},
    {path: '/checkout', element: <Checkout />},
    {path: '/authenticate', element: <Authenticate />},
    {path: '/users', element: <Users />}
    ]
  }
]);

//
//
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  )
}

export default App
