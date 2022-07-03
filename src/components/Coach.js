
import arrowFrom from '../assets/arrowFrom.png'

// styles
import './Coach.css';

// images
import coach_info_trainImg from '../assets/coach/coach_info_trainImg.png';
import coach_sitting    from '../assets/coach/coach_sitting.png';
import coach_platskart  from '../assets/coach/coach_platskart.png';
import coach_coupe      from '../assets/coach/coach_coupe.png';
import coach_lux        from '../assets/coach/coach_lux.png';

// component
import Coach_PickSeat from './Coach_PickSeat';

/*
props: data
  data = {coach:{}, seats:[{}, ...,{}]}

*/ 
export default function Coach(props) {
  return (<div className="coach-wrapper">
    <div style={{maxWidth:'800px'}}>
      {JSON.stringify(props.data.coach)}
      <br /> <br />
      {JSON.stringify(props.data.seats)}
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
      <h2>Количество билетов</h2>
      <div className='ticketCntLeft'>
        <div className='ticketCntLeft_block'>
          <div>Взрослые - 2</div>
          <div>Можно добавить еще 2 пассажиров </div>
        </div>

        <div className='ticketCntLeft_block'>
          <div>Детские - 2</div>
          <div>Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%</div>
        </div>

        <div className='ticketCntLeft_block'>
          <div>Детские без места - 0</div>
          <div></div>
        </div>
      </div>
    </div>

    <div>
      <h2>Тип вагона</h2>
      
      <div className='coachTypes'>
        <div>
          <img className='coachTypes__img' src={coach_sitting} alt="Сидячий" />
          <div>Сидячий</div>
        </div>
        <div>
          <img className='coachTypes__img' src={coach_platskart} alt="Плацкарт" />
          <div>Плацкарт</div>
        </div>
        <div>
          <img className='coachTypes__img' src={coach_coupe} alt="Купе" />
          <div>Купе</div>
        </div>
        <div>
          <img className='coachTypes__img' src={coach_lux} alt="Люкс" />
          <div>Люкс</div>
        </div>
        
      </div>

      <div>
        <h2>Информация о местах</h2>
        <div className='seatInfo-header'>
          <div>Вагоны 07-09</div>
          <div>Нумерация вагонов начинается с головы поезда</div>
        </div>

        <div className='seatInfo-body'>
          <div className='body-block'>
            <div>07</div>
            <div>вагон</div>
          </div>

          <div className='body-block'>
            <div>Места 11</div>
            <div>Верхние 3</div>
            <div>Нижние 8</div>
          </div>

          <div className='body-block'>
            <div>Стоимость</div>
            <div>2920</div>
            <div>3520</div>
          </div>

          <div className='body-block'>
            <div>Обслуживание</div>
            <div>
              <img src="" alt="conditioner" />
              <img src="" alt="wifi" />
              <img src="" alt="bedSheets" />
              <img src="" alt="meal" />
            </div>
          </div>
        </div>

      </div>

      <div>
        <h4>картинка вагона с выбором мест</h4>
        {/* отдельный компонент с выбором мест на картинке вагона */}
        <Coach_PickSeat />
      </div>
    </div>

  </div>)
}





