import './App.css';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>  
      <div className='corpo'>
        <nav><h1>Pokepi</h1></nav>
        <ul>
          <Outlet/>
        </ul>
    </div>
    </>
  );
} 
