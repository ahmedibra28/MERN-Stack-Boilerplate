import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>,
  document.getElementById('root')
)
