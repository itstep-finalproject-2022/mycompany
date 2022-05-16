import './App.css';

import { Home } from './components/Home';
import { Department } from './components/Department';
import { Employee } from './components/Employee';
import { Navigation } from './components/Navigation';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className='m-3 d-flex justify-content-center'>
          MyCompany official site
        </h3>
        <Navigation/>
        <Routes>  
          <Route path='/' element={<Home />} exact/>
          <Route path='/department' element={<Department />}/>
          <Route path='/employee' element={<Employee />}/>
        </Routes>   
      </div>
    </BrowserRouter>
  );
}

export default App;
