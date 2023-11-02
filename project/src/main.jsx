import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'

// importação do react router dom
import {createBrowserRouter,RouterProvider,} from "react-router-dom";

const rota = createBrowserRouter ([

  // https://localhost:3000/
  {
    path: "/",
    element: <App/>,
  },
]);

// inicializando o aplicação
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={rota} />
  </React.StrictMode>,
)