
import arrowFrom from '../assets/arrowFrom.png'

// styles
import './Coach.css';

// images
import coach_info_trainImg from '../assets/coach/coach_info_trainImg.png';
import coach_sitting    from '../assets/coach/coach_sitting.png';
import coach_platskart  from '../assets/coach/coach_platskart.png';
import coach_coupe      from '../assets/coach/coach_coupe.png';
import coach_lux        from '../assets/coach/coach_lux.png';

import serv_conditioner from '../assets/seatsel_serv/serv_conditioner.png';
import serv_wifi from '../assets/seatsel_serv/serv_wifi.png';
import serv_bedsheets from '../assets/seatsel_serv/serv_bedsheets.png';
import serv_meal from '../assets/seatsel_serv/serv_meal.png';


// used components
import Coach_PickSeat from './Coach_PickSeat';

/*
props: data
  data = {coach:{}, seats:[{}, ...,{}]}

*/ 
export default function Coach(props) {
  return (<div className="coach-wrapper">
    <div style={{maxWidth:'800px'}}>
      {/*
      {JSON.stringify(props.data.coach)}
      <br /> <br />
      {JSON.stringify(props.data.seats)}
      */}
    </div>
    <br />

    <div className='CoachSelHeader'>
      <img className='CoachSelHeader__arrow' src={arrowFrom} alt="стрелка туда" />
      <div className='CoachSelHeader__textwrapper'>
        <div className='CoachSelHeader__text'>Выбрать другой поезд</div>
      </div>
    </div>

    <div className='trainInfo'>
      <img src={coach_info_trainImg} alt="logo" className='trainInfo__trainImg' />
      <div>
        <div>номер поезда</div>
        <div>откуда - куда</div>
      </div>
      <div>
        <div>время отбытия</div>
        <div>город</div>
        <div>вокзал</div>
      </div>
      <img src="" alt="стрелка" />
      <div>
        <div>время прибытия</div>
        <div>город</div>
        <div>вокзал</div>
      </div>      
      <div>
        <img src="" alt="картинка часов" />
        <div>
          <div>X часов</div>
          <div>Y минут</div>
        </div>
      </div>
    </div>
    
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

    <div>
      <h2>Тип вагона /{props.data.coach.class_type} </h2>
      
      <div className='coachTypes'> 
        <div className={(props.data.coach.class_type == 'fourth') ? 'cltype_active' : ''}>
          <img className='coachTypes__img' src={coach_sitting} alt="Сидячий" />
          <div>Сидячий</div>         {/* // {props.data.coach.class_type} {JSON.stringify(props.data.coach.class_type == 'forth')} */}
        </div>
        <div  className={(props.data.coach.class_type == 'third') ? 'cltype_active' : ''}>
          <img className='coachTypes__img' src={coach_platskart} alt="Плацкарт" />
          <div>Плацкарт</div>        {/* // {props.data.coach.class_type} {JSON.stringify(props.data.coach.class_type == 'third')} */}
        </div>
        <div  className={(props.data.coach.class_type == 'second') ? 'cltype_active' : ''}>
          <img className='coachTypes__img' src={coach_coupe} alt="Купе" />
          <div>Купе</div>            {/* // {props.data.coach.class_type} {JSON.stringify(props.data.coach.class_type == 'second')} */}
        </div>
        <div  className={(props.data.coach.class_type == 'first') ? 'cltype_active' : ''}>
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
            <div>вагон {props.data.coach.name}</div>
          </div>

          <div className='body-block'>
            <div>Места {props.data.coach.available_seats}</div>
            <div>Верхние - ???</div>
            <div>Нижние - ???</div>
          </div>

          <div className='body-block'>
            <div>Стоимость</div>
            <div>lux_price={props.data.coach.price}</div>
            <div>top_price={props.data.coach.top_price}</div>
            <div>bottom_price={props.data.coach.bottom_price}</div>
            <div>side_price={props.data.coach.side_price}</div>
            <div>wifi_price={props.data.coach.wifi_price}</div>
          </div>

          <div className='body-block'>
            <div>Обслуживание ФПК</div>
            <div className='wrapper-serv_img2'>
              <img 
                className={'serv_img2 ' + ((props.data.coach.have_air_conditioning === true) ? 'serv_img2_selected' : '')} 
                src={serv_conditioner} alt="conditioner" 
              />
              <img 
                className={'serv_img2 ' + ((props.data.coach.have_wifi === true) ? 'serv_img2_selected' : '')}
                src={serv_wifi} alt="wifi" 
              />
              <img 
                className={'serv_img2 ' + ((props.data.coach.is_linens_included === true) ? 'serv_img2_selected' : '')}
                src={serv_bedsheets} alt="bedSheets"  
              />
              <img 
                className={'serv_img2'} 
                src={serv_meal} alt="meal" 
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4>Выбор мест в вагоне</h4>
        {/* отдельный компонент с выбором мест на картинке вагона */}
        <Coach_PickSeat 
          seatsData={props.data.seats}
        />
      </div>
    </div>

  </div>)
}





