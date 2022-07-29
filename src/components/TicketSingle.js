
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

// styles
import './TicketSingle.css';

// images
import train_img from '../assets/train_ticketselect.png';
import TicketSingleSeats from './TicketSingleSeats';
import arrToRight from '../assets/arrow_to_right.png';

// reducer
import { tsToDate, timeInTravelMins } from '../rtkstore/util_functions';
import { actionsTicketReducer } from '../rtkstore/ticketReducer'; 



/**
Props:
 - props.ticket 
*/

//
export default function TicketSingle(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //
  const [lnkSeats, setlnkSeats] = useState('');

  const [from_dt, setfrom_dt] = useState(['']);
  const [from_tm, setfrom_tm] = useState(['']);
  const [to_dt, setto_dt]     = useState(['']);
  const [to_tm, setto_tm]     = useState(['']);
  const [tripInMinutes, settripInMinutes] = useState('');

  //
  const filterPriceSeats = (priceLabel, seats) => {
    for (let keyPrice of Object.keys(seats)) {
      if (keyPrice === priceLabel) {
        return seats[keyPrice];
      }
    }
    //return {};
  }

  useEffect( () => {
    if (props.ticket !== undefined) {
      let d1 = tsToDate(props.ticket.departure.from.datetime).split("T");
      let d2 = tsToDate(props.ticket.departure.to.datetime).split("T");
      let travMins = timeInTravelMins(props.ticket.departure.from.datetime, props.ticket.departure.to.datetime)
      setfrom_dt(d1[0]);
      setfrom_tm(d1[1]);
      setto_dt(d2[0]);
      setto_tm(d2[1]);
      settripInMinutes(travMins);

      setlnkSeats(`/seat_select/${props.ticket.departure._id}`);
    }
  }, [props.ticket])  


  const handleButtonClick = () => {
    let d = {
      'train_id':       props.ticket.departure._id,
      'train_name':     props.ticket.departure.train.name,
      'from_date':      tsToDate(props.ticket.departure.from.datetime),
      'from_city':      props.ticket.departure.from.city.name,
      'from_station':   props.ticket.departure.from.railway_station_name,
      'trip_duration':  tripInMinutes,
      'to_date':        tsToDate(props.ticket.departure.to.datetime),
      'to_city':        props.ticket.departure.to.city.name,
      'to_station':     props.ticket.departure.to.railway_station_name,
    } 

    //
    dispatch( actionsTicketReducer.setpurchaseTrain(d) );
    dispatch( actionsTicketReducer.setpurchaseTrainDetails(props.ticket) );
    // 
    navigate(lnkSeats);
  }

  const handleChangeCheckout = () => {
    navigate('/ticket_select')
  }


  //
  return ( <>
  <div className='ticketWrp'>
    <div className='ticketWrp__trainInfo'> 
      <div>#{props.ticket.departure._id}</div>
      <img src={train_img} alt="train_img" className='ticketWrp__trainImg'/>
      <div>{props.ticket.departure.train.name}</div>
      <div style={{display:'flex'}}>
        <div>{props.ticket.departure.from.city.name}</div> 
        <div>{'->'}</div>
        <div>{props.ticket.departure.to.city.name}</div> 
      </div>
    </div>

    <div className='ticketWrp__tripInfo'>
      <div className='tripInfo__container tripInfo_block'>
        <div className='tripInfo__date'>{from_dt}</div>
        <div className='tripInfo__date'>{from_tm}</div>
        <div className='tripInfo__city'>{props.ticket.departure.from.city.name}</div>
        <div className='tripInfo__station'>{props.ticket.departure.from.railway_station_name}</div>
      </div>
      
      <div className='tripInfo_block'>
        <div>{tripInMinutes}</div>
        <div className='tripInfo__containerCenter'>
          <img className='tripInfo__arrow' src={arrToRight} alt="arrow" />
        </div>
      </div>

      <div className='tripInfo__container tripInfo_block'>
        <div className='tripInfo__date'>{to_dt}</div>
        <div className='tripInfo__date'>{to_tm}</div>
        <div className='tripInfo__city'>{props.ticket.departure.to.city.name}</div>
        <div className='tripInfo__station'>{props.ticket.departure.to.railway_station_name}</div>
      </div>
    </div>

    <div className='ticketWrp__seatInfo'>
      { Object.keys(props.ticket.departure.available_seats_info).map( (item) => {
        return <div key={item}>
          <TicketSingleSeats 
            classTitle={item}
            cntLeft={props.ticket.departure.available_seats_info[item]}
            seatPrices={filterPriceSeats(item, props.ticket.departure.price_info)}
          />
        </div>
      } 
      )}

      { (props.usedPage === 'ticket_select') && 
        <button className='button_seats' onClick={handleButtonClick}>Выбрать места</button>
      }
      { (props.usedPage === 'checkout') && 
        <button className='btn_change' onClick={handleChangeCheckout}>Изменить</button>
      }      
    </div>
  </div>
  </>)
}
