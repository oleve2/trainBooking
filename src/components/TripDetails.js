
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"

// styles
import './TripDetails.css';

// images
import arrow_to_right from '../assets/arrow_to_right.png';
import tstoggle from '../assets/tudasuda_toggle.png';
import arrowFrom from '../assets/arrowFrom.png';
import passengers from '../assets/passengers.png';

//
export default function TripDetails() {
  // store
  const storepurchaseTrain = useSelector( (store) => store.ticketReducer.purchaseTrain )
  const storepurchaseSeats = useSelector( (store) => store.ticketReducer.purchaseSeats )

  const [from_dt, setfrom_dt] = useState(['']);
  const [from_tm, setfrom_tm] = useState(['']);
  const [to_dt, setto_dt]     = useState(['']);
  const [to_tm, setto_tm]     = useState(['']);
  
  const storepassengersList = useSelector( (store) => store.passengerReducer.passengersList)
  const [psngrList, setpsngrList] = useState({});
  
  // form show/hide togglers
  const [tripFromToggle, settripFromToggle] = useState(true);
  const [passengersSectionToggle, setpassengersSectionToggle] = useState(true);
  
  useEffect( () => {
    if (storepurchaseTrain.from_date !== undefined) {
      let d1 = storepurchaseTrain.from_date.split("T")
      let d2 = storepurchaseTrain.to_date.split("T")
      setfrom_dt(d1[0]);
      setfrom_tm(d1[1]);
      setto_dt(d2[0]);
      setto_tm(d2[1]);
    }
  }, [storepurchaseTrain])

  useEffect( () => {
    let newObj = {'Взрослый': 0, 'Детский': 0};
    //console.log('storepassengersList=', storepassengersList)
    for (let i=0; i < storepassengersList.length; i++) {
      //console.log(storepassengersList[i]);
      if (storepassengersList[i].ticketType === 'Взрослый') {
        newObj['Взрослый'] += 1;
      }
      if (storepassengersList[i].ticketType === 'Детский') {
        newObj['Детский'] += 1;
      }      
    }
    //
    setpsngrList(newObj);
  }, [storepassengersList])


  //
  return (<>
  <div className="temp0-0-wrapper">
    <h3>Детали поездки</h3>

    <div>
      <div className="temp1-a">
        <img src={arrowFrom} alt="стрелка Туда" />    
        <div>Туда</div>
        <div>{from_dt}</div>
        <img src={tstoggle} alt="crossToggle" 
          style={{width:'20px', height:'20px'}}
          onClick={() => { settripFromToggle(!tripFromToggle) }}
        />
      </div>

      { tripFromToggle && 
      <div style={{margin:'5px', padding:'5px'}}>
        <div className="temp1-1">
          <div>№ поезда</div>
          <div>{storepurchaseTrain.train_id}</div>
        </div>
        
        <div className="temp1-1">
          <div>Название</div>
          <div>{storepurchaseTrain.train_name}</div>
        </div>

        <div className="temp1-3">
          <div className="temp1-2">
            <div>{from_tm}</div>
            <div>{from_dt}</div>
          </div>
          <div className="temp1-2">
            <div>{storepurchaseTrain.trip_duration}</div>
            <img src={arrow_to_right}  style={{width:'30px', height:'20px'}} alt="" />
          </div>
          <div>
            <div>{to_tm}</div>
            <div>{to_dt}</div>
          </div>
        </div>

        <div className="temp1-1">
          <div>
            <div>{storepurchaseTrain.from_city}</div>
            <div>{storepurchaseTrain.from_station}</div>
          </div>
          
          <div>
            <div>{storepurchaseTrain.to_city}</div>
            <div>{storepurchaseTrain.to_station}</div>
          </div>
        </div>
      </div>
      }
    </div>

    <hr />

    <div>
      <div  className="temp1-a">
        <img src={passengers} alt="стрелка Туда" />    
        <div>Пассажиры</div>
        <img src={tstoggle} alt="crossToggle" 
          style={{width:'20px', height:'20px'}}
          onClick={() => { setpassengersSectionToggle(!passengersSectionToggle) }}
        />
      </div>

      { passengersSectionToggle &&  
      <div style={{margin:'5px', padding:'5px'}}>
        <div>Взрослых - {psngrList['Взрослый']}</div> 
        <div>Детских - {psngrList['Детский']}</div>     
      </div>
      }
    </div>

    <hr />

    <div>
      <div>Итог</div>

      <div>Информация по местам</div>
      { storepurchaseSeats.map( (item, ind) => {
        return <div key={ind}> {/*JSON.stringify(item)*/}
          Вагон {item.coachName} место {item.seatIndex}
        </div>
      }) } 
      <br />
      <div>Итоговая стоимость: ??? р.</div>
    </div>
    <hr />
  </div>
  </>)
}
