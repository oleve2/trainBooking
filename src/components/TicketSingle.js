
import './TicketSingle.css';

import { useState } from 'react';
import { Link } from 'react-router-dom'; 

//
export default function TicketSingle(props) {
  
  const [lnkSeats, setlnkSeats] = useState(`/seat_select/${props.ticket.departure._id}`)

  return ( <>
  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr'}}>
    <div style={{border: '1px solid black'}}>
      <div>#{props.ticket.departure._id}</div>
      <img src="" alt="train_img" />
      <div>{props.ticket.departure.train._id} // {props.ticket.departure.train.name}</div>
      <div>{props.ticket.departure.from.city.name} -> {props.ticket.departure.to.city.name}</div>
    </div>

    <div style={{border: '1px solid black'}}>
      <div>From: {props.ticket.departure.from.datetime}:{props.ticket.departure.from.city.name}({props.ticket.departure.from.railway_station_name})
      </div>
      <div>To: {props.ticket.departure.to.datetime}:{props.ticket.departure.to.city.name}({props.ticket.departure.to.railway_station_name})
      </div>
    </div>

    <div style={{border: '1px solid black', display:'grid', gridTemplateRows:'1fr 40px'}}>
      { JSON.stringify(props.ticket.available_seats_info)}
        <Link className='button_seats' to={lnkSeats}>Выбрать места</Link>
    </div>
  </div>
  
  {/*JSON.stringify(props.ticket)*/}
  </>)
}
