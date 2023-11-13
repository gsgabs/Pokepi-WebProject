import './App.css';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>  
      <div className='corpo'>
        <nav></nav>
        <ul>
          <Outlet/>
        </ul>
    </div>
    </>
  );
} 
