
import Navigation from "../components/Navigation"
import TicketSearchForm from "../components/TicketSearchForm"
import Footer from "../components/Footer";
import HeaderLogoNavi from "../components/HeaderLogoNavi";

import RangeSlider from "../components/ui/RangeSlider";
import Switcher from "../components/ui/Switcher";

import TudaObratno from "../components/TudaObratno";
import NavigationTicket from "../components/NavigationTicket";

import './PageTicketSelect.css';

import imgKupe from '../assets/kupe.png';
import imgPlats from '../assets/platskart.png';
import imgSit from '../assets/sitting.png';
import imgLux from '../assets/lux.png';
import imgWifi from '../assets/wifi.png';
import imgExpress from '../assets/express.png';

// -------------------------------------
export default function PageTicketSelect(props) {
  return (<>
    <div className="TSHeader block">
      <HeaderLogoNavi/>
      
      <div className="tsform">
        <TicketSearchForm  direction='row'/>
      </div>

      <NavigationTicket />
      
    </div>

    <div className="TSBody block">
      {/* --------------------------------- */}
      <div className="TSBody__left">
        <div className="TSParams block">

          <div className="tsparamBlock">
            <div className="trip_date">
              <label className="trip_date__label">Дата поездки</label>
              <input className="trip_date__input" type="date" />
            </div>
            <div className="trip_date">
              <label className="trip_date__label">Дата возвращения</label>
              <input className="trip_date__input" type="date" />
            </div>
          </div>
          <hr className="hrLine"/>

          <div className="tsparamBlock">
            <ul className="ticketOptions__ul">
              <li className="ticketOptions__li">
                <img src={imgKupe} alt="Купе" />
                <div>Купе</div>
                <Switcher />
              </li>
              <li className="ticketOptions__li">
                <img src={imgPlats} alt="Плацкарт" />
                <div>Плацкарт</div>
                <Switcher />
              </li>
              <li className="ticketOptions__li">
                <img src={imgSit} alt="Сидячий" />
                <div>Сидячий</div>
                <Switcher />
              </li>
              <li className="ticketOptions__li">
                <img src={imgLux} alt="Люкс" />
                <div>Люкс</div>
                <Switcher />
              </li>            
              <li className="ticketOptions__li">
                <img src={imgWifi} alt="WIFI" />
                <div>WIFI</div>
                <Switcher />
              </li>   
              <li className="ticketOptions__li">
                <img src={imgExpress} alt="Экспресс" />
                <div>Экспресс</div>
                <Switcher />
              </li> 
            </ul>
          </div>
          <hr className="hrLine"/>

          <div className="tsparamBlock">
            <label className="trip_date__label">Стоимость</label>
            <RangeSlider min={0} max={250} rangeWidth='300px' /> {/* rangeName='Стоимость' */}
          </div>
          <hr className="hrLine"/>

          <div className="tsparamBlock">
            <label className="trip_date__label">Туда</label>
            <TudaObratno  /> {/* title='Туда' */}
          </div>
          <hr className="hrLine"/>

          <div className="tsparamBlock">
            <label className="trip_date__label">Обратно</label>
            <TudaObratno  /> {/* title='Обратно' */}
          </div>

        </div>
        
        <div className="TSLatest block">
          <div>Последние билеты</div> 
          <ul>
            <li>Санкт-Петербург</li>
            <li>Москва</li>
            <li>Казань</li>
          </ul>
        </div>
      </div>

      {/* --------------------------------- */}
      <div className="TSBody__right"  style={{overflowX: 'scroll'}}>
        <div className="TicketList block">
          <h3>Билеты</h3>
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <div>Найдено 20</div>
            <div>Сортировать по: времени</div>
            <div>показывать по: 5 10 20</div>
          </div>
          <ul style={{padding: '0', listStyleType: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <li style={{width: '900px', height: '300px', border: '1px solid black', margin: '0px 20px 20px 0px'}}>Билет 1</li>
            <li style={{width: '900px', height: '300px', border: '1px solid black', margin: '0px 20px 20px 0px'}}>Билет 2</li>
            <li style={{width: '900px', height: '300px', border: '1px solid black', margin: '0px 20px 20px 0px'}}>Билет 3</li>
          </ul>
        </div>
        <div className="TIcketSlider block" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h4>Крутилка</h4>
          <div style={{display: 'flex'}}>
            <div style={{width: '60px', height: '60px', border: '1px solid black', margin: '5px 10px'}}>left</div>
            <div style={{width: '60px', height: '60px', border: '1px solid black', margin: '5px 10px'}}>1</div>
            <div style={{width: '60px', height: '60px', border: '1px solid black', margin: '5px 10px'}}>2</div>
            <div style={{width: '60px', height: '60px', border: '1px solid black', margin: '5px 10px'}}>3</div>
            <div style={{width: '60px', height: '60px', border: '1px solid black', margin: '5px 10px'}}>4</div>
            <div style={{width: '60px', height: '60px', border: '1px solid black', margin: '5px 10px'}}>right</div>
          </div>
        </div>
      </div>
    </div>

    <div className="TSFooter">
      <Footer/>
    </div>
  </>
  )
}


