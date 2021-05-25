import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import store from './redux/store'
import { Provider } from 'react-redux'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
)
