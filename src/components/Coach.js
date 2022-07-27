import React from 'react';

// styles
import './Coach.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// images
import coach_info_trainImg from '../assets/coach/coach_info_trainImg.png';
import coach_sitting    from '../assets/coach/coach_sitting.png';
import coach_platskart  from '../assets/coach/coach_platskart.png';
import coach_coupe      from '../assets/coach/coach_coupe.png';
import coach_lux        from '../assets/coach/coach_lux.png';

import serv_conditioner_na  from '../assets/seatsel_serv/cond_na.png';
import serv_wifi_na         from '../assets/seatsel_serv/wifi_na.png';
import serv_bedsheets_na    from '../assets/seatsel_serv/bedsheets_na.png';
import serv_meal_na         from '../assets/seatsel_serv/meal_na.png';

import arrowFrom from '../assets/arrowFrom.png'
import arrowToRight from '../assets/arrow_to_right.png';
import clock from '../assets/clock.png';

// used components
import Coach_PickSeat from './Coach_PickSeat';

// store
import { actionsTicketReducer } from '../rtkstore/ticketReducer';


/*
props: data
  data = {coach:{}, seats:[{}, ...,{}]}
*/ 

//
export default function Coach(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // store
  const storepurchaseTrain = useSelector( (store) => store.ticketReducer.purchaseTrain);

  //
  const doReturnBack = () => {
    // clear purchaseTrain + purchaseSeats
    dispatch( actionsTicketReducer.setpurchaseTrain({}) );
    dispatch( actionsTicketReducer.setpurchaseSeats([]) );
    //
    navigate('/ticket_select');
  }

  //
  return (<div className="coach-wrapper">
    {/*
    <div style={{maxWidth:'800px'}}>
      {JSON.stringify(props.data.coach)}
      <br /> <br />
      {JSON.stringify(props.data.seats)}
    </div>
    <br />
    */}

    <div className='CoachSelHeader coach-wrapper-div'>
      <img className='CoachSelHeader__arrow' src={arrowFrom} alt="стрелка туда" />
      <div className='CoachSelHeader__textwrapper' onClick={doReturnBack}>
        <div className='CoachSelHeader__text'>Выбрать другой поезд</div>
      </div>
    </div>
    
    {/* store data */}
    <div className='trainInfo coach-wrapper-div'>
      <img src={coach_info_trainImg} alt="logo" className='trainInfo__trainImg' />

      <div>
        <div>{storepurchaseTrain.train_name}</div> {/*номер поезда*/}
        <div>{storepurchaseTrain.from_city} - {storepurchaseTrain.to_city}</div> {/*откуда - куда*/}
      </div>

      <div>
        <div>{storepurchaseTrain.from_date}</div> {/*время отбытия*/}
        <div>{storepurchaseTrain.from_city}</div> {/*город*/}
        <div>{storepurchaseTrain.from_station}</div> {/*вокзал*/}
      </div>

      <img src={arrowToRight} alt="стрелка" />

      <div>
        <div>{storepurchaseTrain.to_date}</div> {/*время прибытия*/}
        <div>{storepurchaseTrain.to_city}</div> {/*город*/}
        <div>{storepurchaseTrain.to_station}</div> {/*вокзал*/}
      </div>      

      <div style={{display:'flex'}}>
        <img src={clock} alt="картинка часов" style={{margin:'5px 10px', height:'30px', width:'30px'}} />
        <div style={{display:'flex', alignItems:'center'}}> {storepurchaseTrain.trip_duration}
          {/*<div></div> X часов*/}
          {/*<div></div> Y минут*/}
        </div>
      </div>
    </div>
    
    {/*
    <div>
      <h2>Количество билетов: {props.data.coach.available_seats}</h2>
      <div className='ticketCntLeft'>
        <div className='ticketCntLeft_block'>
          <div>Взрослые - ?</div>
          <div>Можно добавить еще 2 пассажиров </div>
        </div>
        <div className='ticketCntLeft_block'>
          <div>Детские - ?</div>
          <div>Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%</div>
        </div>
        <div className='ticketCntLeft_block'>
          <div>Детские без места - ?</div>
          <div></div>
        </div>
      </div>
    </div>
    */}

    <div className='coach-wrapper-div'>
      <h2>Тип вагона ({props.data.coach.class_type})</h2>
      
      <div className='coachTypes'> 
        <div className={'coachTypes__wrapper ' + ((props.data.coach.class_type === 'fourth') ? 'cltype_active' : '')}>
          <img className='coachTypes__img' src={coach_sitting} alt="Сидячий" />
          <div>Сидячий</div>         {/* // {props.data.coach.class_type} {JSON.stringify(props.data.coach.class_type == 'forth')} */}
        </div>

        <div className={'coachTypes__wrapper ' + ((props.data.coach.class_type === 'third') ? 'cltype_active' : '')}>
          <img className='coachTypes__img' src={coach_platskart} alt="Плацкарт" />
          <div>Плацкарт</div>        {/* // {props.data.coach.class_type} {JSON.stringify(props.data.coach.class_type == 'third')} */}
        </div>

        <div className={'coachTypes__wrapper ' + ((props.data.coach.class_type === 'second') ? 'cltype_active' : '')}>
          <img className='coachTypes__img' src={coach_coupe} alt="Купе" />
          <div>Купе</div>            {/* // {props.data.coach.class_type} {JSON.stringify(props.data.coach.class_type == 'second')} */}
        </div>

        <div className={'coachTypes__wrapper ' + ((props.data.coach.class_type === 'first') ? 'cltype_active' : '')}>
          <img className='coachTypes__img' src={coach_lux} alt="Люкс" />
          <div>Люкс</div>            {/* // {props.data.coach.class_type} {JSON.stringify(props.data.coach.class_type == 'first')} */}
        </div>
      </div>

      <div>
        <h2>Информация о местах</h2>
        <div className='seatInfo-header'>
          <div>Вагоны ??? {props.data.coach.name}</div>
          <div>Нумерация вагонов начинается с головы поезда</div>
        </div>

        <div className='seatInfo-body'>
          <div className='body-block'>
            <div className='body-block__Info_title'>Вагон {props.data.coach.name}</div>
          </div>

          <div className='body-block'>
            <div className='body-block__Info_title'>Места: {props.data.coach.available_seats}</div>
            
            {/* price  (lux)*/}
            { (props.data.coach.price !== 0) ? <div className='body-block__Info_SeatCntPrice'>
              <div className='body-block__Info_div'>lux_cnt=???</div>
              <div className='body-block__Info_div'>lux_price={props.data.coach.price}</div>
            </div> 
            : <></>
            }
            
            {/* top_price */}
            { (props.data.coach.top_price !== 0) ? <div className='body-block__Info_SeatCntPrice'>
              <div className='body-block__Info_div'>Верхние ???</div>
              <div className='body-block__Info_div'>{props.data.coach.top_price} р.</div>
            </div> 
            : <></>}
            
            {/* bottom_price */}
            { (props.data.coach.top_bottom_priceprice !== 0) ? <div className='body-block__Info_SeatCntPrice'>
              <div className='body-block__Info_div'>Нижние ???</div>
              <div className='body-block__Info_div'>{props.data.coach.bottom_price} р.</div>
            </div> 
            : <></>
            }
            
            {/* side_price */}
            { (props.data.coach.side_price !== 0) ? <div className='body-block__Info_SeatCntPrice'>
              <div className='body-block__Info_div'>Боковые ???</div>
              <div className='body-block__Info_div'>{props.data.coach.side_price} р.</div>
            </div> 
            : <></>
            }
            
            {/* wifi_price */}
            { (props.data.coach.wifi_price !== 0) ? <div className='body-block__Info_SeatCntPrice'>
              <div className='body-block__Info_div'>WIFI</div>
              <div className='body-block__Info_div'>{props.data.coach.wifi_price} р.</div>
            </div> 
            : <></>
            }            
          </div>

          <div className='body-block'>
            <div className='body-block__Info_title'>Обслуживание ФПК</div>

            <div className='wrapper-serv_img2'>
              <img 
                className={'serv_img2 ' + ((props.data.coach.have_air_conditioning === true) ? 'serv_img2_selected' : '')} 
                src={serv_conditioner_na} alt="conditioner" 
              />
              <img 
                className={'serv_img2 ' + ((props.data.coach.have_wifi === true) ? 'serv_img2_selected' : '')}
                src={serv_wifi_na} alt="wifi" 
              />
              <img 
                className={'serv_img2 ' + ((props.data.coach.is_linens_included === true) ? 'serv_img2_selected' : '')}
                src={serv_bedsheets_na} alt="bedSheets"  
              />
              <img 
                className={'serv_img2'} 
                src={serv_meal_na} alt="meal" 
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2>Выбор мест в вагоне</h2>
        {/* отдельный компонент с выбором мест на картинке вагона */}
        <Coach_PickSeat 
          seatsData={props.data.seats}
          coachName={props.data.coach.name}
        />
      </div>
    </div>

  </div>)
}





