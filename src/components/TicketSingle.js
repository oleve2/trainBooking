
import './TicketSingle.css';

import { useState } from 'react';
import { Link } from 'react-router-dom'; 

import { tsToDate, tsToTime } from '../rtkstore/ticketReducer';
import train_img from '../assets/train_ticketselect.png';
import TicketSingleSeats from './TicketSingleSeats';

// images
import arrToRight from '../assets/arrow_to_right.png';


/**
 * ticket 
 */
export default function TicketSingle(props) {
  //
  const [lnkSeats, setlnkSeats] = useState(`/seat_select/${props.ticket.departure._id}`)
  //
  const filterPriceSeats = (priceLabel, seats) => {
    for (let keyPrice of Object.keys(seats)) {
      if (keyPrice === priceLabel) {
        return seats[keyPrice];
      }
    }
    //return {};
  }


  //
  return ( <>
  <div className='ticketWrp'>
    <div className='ticketWrp__trainInfo'> 
      <div>#{props.ticket.departure._id}</div>
      <img src={train_img} alt="train_img" className='ticketWrp__trainImg'/>
      <div>{props.ticket.departure.train.name}</div> {/* {props.ticket.departure.train._id} //  */}
      <div style={{display:'flex'}}>
        <div>{props.ticket.departure.from.city.name}</div> 
        <div>{'->'}</div>
        <div>{props.ticket.departure.to.city.name}</div> 
      </div>
    </div>

    <div className='ticketWrp__tripInfo'>
      <div className='tripInfo__container tripInfo_block'>
        <div className='tripInfo__date'>{tsToDate(props.ticket.departure.from.datetime)}</div>   {/* from date: */}
        <div className='tripInfo__city'>{props.ticket.departure.from.city.name}</div>            {/* from city: */}
        <div className='tripInfo__station'>{props.ticket.departure.from.railway_station_name}</div> {/* from station: */}
      </div>
      
      <div className='tripInfo_block'>
        <div>{tsToTime(props.ticket.departure.duration)}</div> {/* time of trip: */}
        <div className='tripInfo__containerCenter'>
          <img className='tripInfo__arrow' src={arrToRight} alt="arrow" />
        </div>
      </div>

      <div className='tripInfo__container tripInfo_block'>
        <div className='tripInfo__date'>{tsToDate(props.ticket.departure.to.datetime)}</div>   {/* to date: */}
        <div className='tripInfo__city'>{props.ticket.departure.to.city.name}</div>            {/* to city: */}
        <div className='tripInfo__station'>{props.ticket.departure.to.railway_station_name}</div> {/* to station: */}
      </div>
    </div>

    <div className='ticketWrp__seatInfo'>
      {/* перенести в отдельный объект (с функцией)*/}

      {/**/}
      { Object.keys(props.ticket.departure.available_seats_info).map( (item) => {
        return <div key={item}>
          {/*
          {item} / 
          {props.ticket.departure.available_seats_info[item]} <br />
          <div>{ JSON.stringify(filterPriceSeats(item, props.ticket.departure.price_info)) }</div>  
          <br/><br/>
          */}
          
          <TicketSingleSeats 
            classTitle={item}
            cntLeft={props.ticket.departure.available_seats_info[item]}
            seatPrices={filterPriceSeats(item, props.ticket.departure.price_info)}
          />
          {/*<hr />*/}
        </div>
      } 
      )}

      <Link className='button_seats' to={lnkSeats}>Выбрать места</Link>
    </div>
  </div>
  
  {/*JSON.stringify(props.ticket)*/}
  </>)
}
