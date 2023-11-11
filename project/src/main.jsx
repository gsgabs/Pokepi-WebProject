import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';

// importação do react router dom
import {createBrowserRouter,RouterProvider,} from "react-router-dom";

// paginas do app
import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';

const rota = createBrowserRouter ([

  // https://localhost:3000/
  {
    path: "/",
    element: <App/>,
    children:[{
      path:"/",
      element:<Pokedex/>
    },{
      path:"/:id",
      element:<Pokemon/>
    }
    ]
  },
]);

// inicializando o aplicação
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={rota} />
  </React.StrictMode>,
)
