import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Store } from './store/Store.tsx'
import { Provider } from 'react-redux'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
      </Provider>
  </React.StrictMode>,
)
