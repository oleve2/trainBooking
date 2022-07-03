
// styles
import './TickSel_SearchPanel.css'


import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// images -----------------
import tstoggle from '../assets/tudasuda_toggle.png';
import arrowFrom from '../assets/arrowFrom.png';
import arrowTo from '../assets/arrowTo.png';

import imgKupe from '../assets/kupe.png';
import imgPlats from '../assets/platskart.png';
import imgSit from '../assets/sitting.png';
import imgLux from '../assets/lux.png';
import imgWifi from '../assets/wifi.png';
import imgExpress from '../assets/express.png';

// components
import RangeSlider from "./ui/RangeSlider";
import Switcher from "./ui/Switcher";

import TudaObratno from "./TudaObratno";

// store
import { actionsTicketReducer } from '../rtkstore/ticketReducer';


//
export default function TickSel_SearchPanel(props) {
  const dispatch = useDispatch();

  const [tudaToggle, setTudaToggle] = useState(false)
  const [obratnoToggle, setObratnoToggle] = useState(false)

  // store
  const storeisKupe = useSelector( (store) => store.ticketReducer.searchParams.isKupe );
  const changeIsKupe = (val) => { dispatch( actionsTicketReducer.setisKupe(val) ) };

  
  return (<>
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
            <div>Купе {JSON.stringify(storeisKupe)}</div>
            <Switcher data={storeisKupe} changer={changeIsKupe}/>
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
        <div className="tspb__header">
          <div>
            <img src={arrowFrom} alt="arrFrom" />
            <label className="trip_date__label">Туда</label>
          </div>
          <img src={tstoggle} alt="toggle" onClick={() => {setTudaToggle(!tudaToggle)}}/>
        </div>
        
        { tudaToggle ? <TudaObratno  /> : <></> }
      </div>
      <hr className="hrLine"/>

      <div className="tsparamBlock">
        <div className="tspb__header">
          <div>
            <img src={arrowTo} alt="arrTo" />
            <label className="trip_date__label">Обратно</label>
          </div>
          <img src={tstoggle} alt="toggle"  onClick={() => {setObratnoToggle(!obratnoToggle)}}/>
        </div>

        { obratnoToggle ? <TudaObratno  /> : <></> }
      </div>
    </div>  
  </>
  )
}
