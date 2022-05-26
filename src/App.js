import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageHome from './pages/PageHome';
import PageTicketSelect from './pages/PageTicketSelect';
import PagePayment from './pages/PagePayment';
import PageOrderSuccess from './pages/PageOrderSuccess';

import './App.css';

import { fetchTicketsLast } from './rtkstore/ticketReducer';
import { useDispatch } from 'react-redux';

// --------------------------
function App() {
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(fetchTicketsLast());
  },[])

  return (
    <div className='mainWrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PageHome/>}></Route>
          <Route path='/ticket_select' element={<PageTicketSelect/>}></Route>
          <Route path='/payment' element={<PagePayment/>}></Route>
          <Route path='/payment_success' element={<PageOrderSuccess/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
