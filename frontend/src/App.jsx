import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import {QueryClient, QueryClientProvider} from 'react-query'
import { useCallback, useEffect, useState } from 'react';

import store from'./utilities/store';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import ErrorPage from './pages/ErrorPage';
import RootLayout from './pages/RootLayout';
import OrderCart from './pages/OrderCart';
import Authenticate from './pages/Authenticate';
import Users from './pages/Users';
import AddDine from './pages/AddDine';
import { AuthContext } from './context/auth-context';

import './App.css'

const queryClient = new QueryClient();
let logoutTimer;

const router = createBrowserRouter([
  {path: '/',
   element: <RootLayout/>,
   errorElement: <ErrorPage/>,
   children: [
    {index: true, element: <Home />},
    {path: '/menu', element: <Menu />},
    {path: '/ordercart', element: <OrderCart />},
    {path: '/checkout', element: <Checkout />},
    {path: '/auth', element: <Authenticate />},
    {path: '/users', element: <Users />},
    {path: '/dines/new', element: <AddDine />}
    ]
  }
]);

//
//
function App() {

  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(false);


  const login = useCallback((uid, token, expiration) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expiration || new Date(new Date().getTime() + 60 * 60 * 1000);

    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId:uid,
        token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  },[]);

  useEffect(() => {
    const storeDate = JSON.parse(localStorage.getItem('userData'));
    if (storeDate && storeDate.token &&
          new Date(storeDate.expiration > new Date())) {
      login(storeDate.userId, storeDate.token,  new Date(storeDate.expiration))
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
       clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logout]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </AuthContext.Provider>
  )
}

export default App
