import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageHome from './pages/PageHome';
import PageTicketSelect   from './pages/PageTicketSelect';
import PageSeatSelect     from './pages/PageSeatSelect';
import PagePassengers     from './pages/PagePassengers'; 

import PagePayment        from './pages/PagePayment';
import PageCheckout from './pages/PageCheckout';

import './App.css';

import { fetchTicketsLast } from './rtkstore/ticketReducer';
import { useDispatch } from 'react-redux';

// --------------------------
function App() {
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(fetchTicketsLast());
    document.title = 'Train Booking Service';
  },[])

  return (
    <div className='mainWrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PageHome/>}></Route>
          <Route path='/ticket_select' element={<PageTicketSelect/>}></Route>
          <Route path='/seat_select/:trainId' element={<PageSeatSelect/>}></Route>
          <Route path='/passengers' element={<PagePassengers />}></Route>

          <Route path='/payment' element={<PagePayment/>}></Route>
          <Route path='/checkout' element={<PageCheckout/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
