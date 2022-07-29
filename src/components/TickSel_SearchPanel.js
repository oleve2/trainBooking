
// styles
import './TickSel_SearchPanel.css'

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// libraries
import debounce from 'lodash.debounce';


// images -----------------
import tstoggle from '../assets/tudasuda_toggle.png';
import arrowFrom from '../assets/arrowFrom.png';

import imgKupe from '../assets/kupe.png';
import imgPlats from '../assets/platskart.png';
import imgSit from '../assets/sitting.png';
import imgLux from '../assets/lux.png';
import imgWifi from '../assets/wifi.png';
import imgExpress from '../assets/express.png';

// components
import RangeSlider from "./ui/RangeSlider";
import Switcher from "./ui/Switcher";

// store
import { actionsTicketReducer } from '../rtkstore/ticketReducer';
import { fetchRoutes, updatepriceRange, updatetudaDepartDateRange, updatetudaArrivDateRange } from '../rtkstore/ticketReducer';


//
export default function TickSel_SearchPanel() {
  const dispatch = useDispatch();

  const [tudaToggle, setTudaToggle] = useState(false)

  // store (params and changers)
  const {
    storeDateDepart,
    storeDateReturn,
    //
    storeisKupe,
    storeisPlatskart,
    storeisSitting,
    storeisLux,
    storeisWifi,
    storeisExpress,
    //
    storepriceRange,
    storetudaDepartDateRange,
    storetudaArrivDateRange,
  } = useSelector( store => ({
    storeDateDepart: store.ticketReducer.searchParams.dateDepart,
    storeDateReturn: store.ticketReducer.searchParams.dateReturn,
    //
    storeisKupe:      store.ticketReducer.searchParams.isKupe,
    storeisPlatskart: store.ticketReducer.searchParams.isPlatskart,
    storeisSitting:   store.ticketReducer.searchParams.isSitting,
    storeisLux:       store.ticketReducer.searchParams.isLux,
    storeisWifi:      store.ticketReducer.searchParams.isWifi,
    storeisExpress:   store.ticketReducer.searchParams.isExpress,
    //
    storepriceRange:          store.ticketReducer.searchParams.priceRange,
    storetudaDepartDateRange: store.ticketReducer.searchParams.tudaDepartDateRange,
    storetudaArrivDateRange:  store.ticketReducer.searchParams.tudaArrivDateRange,
  }))

  // set DateDepart
  const clickDateDepart = (val) => {
    //console.log(`DateDepart = ${val}`);
    dispatch(actionsTicketReducer.setdateDepart(val)) 
  }

  // set DateReturn
  const clickDateReturn = (val) => {
    //console.log(`DateReturn = ${val}`);
    dispatch(actionsTicketReducer.setdateReturn(val)) 
  }  

  //
  const changeisKupe          = (val) => { 
    dispatch( actionsTicketReducer.setisKupe(val) );
    dispatch( fetchRoutes() );
  };
  const changeisPlatskart     = (val) => { 
    dispatch( actionsTicketReducer.setisPlatskart(val) );
    dispatch( fetchRoutes() );
  };
  const changestoreisSitting  = (val) => { 
    dispatch( actionsTicketReducer.setisSitting(val) );
    dispatch( fetchRoutes() );
  };
  const changeisLux           = (val) => { 
    dispatch( actionsTicketReducer.setisLux(val) );
    dispatch( fetchRoutes() );
  };
  const changeisWifi          = (val) => { 
    dispatch( actionsTicketReducer.setisWifi(val) );
    dispatch( fetchRoutes() );
  };
  const changeisExpress       = (val) => { 
    dispatch( actionsTicketReducer.setisExpress(val) );
    dispatch( fetchRoutes() );
  };
  

  // top level debouncer for price setting (изменить названия функций)
  const doUpdatePriceRange = (val) => {
    //console.log(val, val[0], val[1]);
    dispatch( updatepriceRange(val) );
    dispatch( fetchRoutes() );
  }
  const topLevelDebouncer = debounce(doUpdatePriceRange, 1000)

  // top level debouncer for tuda depart and arriv hours
  const doTudaDepartDate = (val) => {
    //console.log('doTudaDepartDate', val);
    dispatch( updatetudaDepartDateRange(val) );
  }
  const topLevelTudaDepartDateDebouncer = debounce(doTudaDepartDate, 1000)

  const doTudaArrivDate = (val) => {
    //console.log('doTudaArrivDate', val);
    dispatch( updatetudaArrivDateRange(val) );
  }
  const topLevelTudaArrivDateDebouncer = debounce(doTudaArrivDate, 1000)


  //
  return (<>
    <div className="TSParams block">
      <div className="tsparamBlock">
        <div className="trip_date">
          <label className="trip_date__label">Дата поездки</label>
          <input className="trip_date__input" type="date" 
            value={storeDateDepart}
            onChange={(e) => { clickDateDepart(e.target.value) } }
          />
        </div>
        <div className="trip_date">
          <label className="trip_date__label">Дата возвращения</label>
          <input className="trip_date__input" type="date" 
            value={storeDateReturn}
            onChange={(e) => { clickDateReturn(e.target.value) } }
          />
        </div>
      </div>
      <hr className="hrLine"/>

      <div className="tsparamBlock">
        <ul className="ticketOptions__ul">
          <li className="ticketOptions__li">
            <img src={imgKupe} alt="Купе" /> 
            <div>Купе</div>
            <Switcher data={storeisKupe} changer={changeisKupe}/>
          </li>

          <li className="ticketOptions__li">
            <img src={imgPlats} alt="Плацкарт" /> 
            <div>Плацкарт</div>
            <Switcher data={storeisPlatskart} changer={changeisPlatskart}/>
          </li>

          <li className="ticketOptions__li">
            <img src={imgSit} alt="Сидячий" /> 
            <div>Сидячий</div>
            <Switcher data={storeisSitting} changer={changestoreisSitting}/>
          </li>

          <li className="ticketOptions__li">
            <img src={imgLux} alt="Люкс" />
            <div>Люкс</div>
            <Switcher data={storeisLux} changer={changeisLux}/>
          </li>

          <li className="ticketOptions__li">
            <img src={imgWifi} alt="WIFI" />
            <div>WIFI</div>
            <Switcher data={storeisWifi} changer={changeisWifi}/>
          </li>

          <li className="ticketOptions__li">
            <img src={imgExpress} alt="Экспресс" />
            <div>Экспресс</div>
            <Switcher data={storeisExpress} changer={changeisExpress}/>
          </li> 
        </ul>
      </div>
      <hr className="hrLine"/>

      
      <div className="tsparamBlock">
        <label className="trip_date__label">Стоимость</label>
        
        <RangeSlider 
          min={0} 
          max={10000} 
          value={storepriceRange}
          rangeWidth='300px' 
          topLevelDebouncer={topLevelDebouncer}
        />
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
        
        { tudaToggle 
          ? <>
          <div style={{margin: '20px 0px'}}>
            <div></div>
            <div>
              <RangeSlider 
                min={0} 
                max={24} 
                value={storetudaDepartDateRange}
                topLevelDebouncer={topLevelTudaDepartDateDebouncer}
                rangeName='Время отбытия' rangeWidth='300px'
              />
            </div>
            <div>
              <RangeSlider 
                min={0} 
                max={24} 
                value={storetudaArrivDateRange}
                topLevelDebouncer={topLevelTudaArrivDateDebouncer}          
                rangeName='Время прибытия' rangeWidth='300px'
              />
            </div>
          </div>          
          </>
          : <></> 
        }
      </div>
      
      <hr className="hrLine"/>

    </div>  
  </>
  )
}
