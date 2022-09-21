import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Firebase, { FirebaseContext } from './utils/firebase/index'
import App from './App'
import Dashboard from './components/dashboard'
import CryptoDetail from './components/crypto/cryptoDetail'
import Cryptos from './components/crypto/cryptos'
import Account from './components/account/account'
import SignUpPage from './components/account/signUp'
import SignInPage from './components/account/signIn'
import NotFound from './components/layout/notFound'
import { RequireAuth } from './utils/session'
import reportWebVitals from './reportWebVitals'
import './sass/site.scss'
import 'antd/dist/antd.min.css'

const clientOpts = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
}
const queryClient = new QueryClient(clientOpts)
const container =  document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App/>}>
                  <Route index element={<Dashboard/>}/>
                  <Route path='/cryptos' element={<Cryptos/>}/>
                  <Route path='/account' element={
                    <RequireAuth>
                      <Account/>
                    </RequireAuth>
                  }/>
                  <Route path='/crypto/:coinId' element={<CryptoDetail/>}/>
                  <Route path='/signup' element={<SignUpPage/>}/>
                  <Route path='/signin' element={<SignInPage/>}/>
                  <Route path='*' element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </FirebaseContext.Provider>
  </React.StrictMode>
)

reportWebVitals()
