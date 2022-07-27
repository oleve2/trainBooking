
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionsTicketReducer } from "../rtkstore/ticketReducer";
import { useNavigate } from "react-router-dom";

import { cloneDeep } from "lodash";

// components
import HeaderLogoNavi from "../components/HeaderLogoNavi";
import TicketSearchForm from "../components/TicketSearchForm"
import Footer from "../components/Footer";
import NavigationProgress from "../components/NavigationProgress";

import TripDetails from "../components/TripDetails";
import PassengerAddForm from "../components/PassengerAddForm";

// store
import { actionsPassengerReducer } from "../rtkstore/passengerReducer";

// style
import './PagePassengers.css';

// images
import psngrShow from '../assets/passengers/passengerShow.png';

//
export default function PagePassengers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* а должно ли биться кол-во мест в заказе с кол-вом пассажиров в заявке? */ 
  // store
  const passengerList       = useSelector((store) => store.passengerReducer.passengersList );
  const pasengerId          = useSelector((store) => store.passengerReducer.lastPassengerId);
  const storepurchaseSeats  = useSelector((store) => store.ticketReducer.purchaseSeats);

  const handleAddPassenger = () => {
    let pl2 = cloneDeep(passengerList);
    pl2.push({id: pasengerId});
    dispatch( actionsPassengerReducer.setlastPassengerId(pasengerId+1) );   //setpasengerId(pasengerId+1);
    dispatch( actionsPassengerReducer.setpassengersList(pl2) );   //setpassengerList(pl2);
    return;
  }

  const handleRemovePassenger = (id) => {
    let pl2 = cloneDeep(passengerList);
    for (let i=0; i < pl2.length; i++) {
      if (pl2[i].id === id) {
        pl2.splice(i, 1);
        //setpassengerList(pl2);
        dispatch( actionsPassengerReducer.setpassengersList(pl2) );
        return;
      }
    }
  }

  const handleUpdatePassenger = (item) => {
    let pl2 = cloneDeep(passengerList);
    for (let i=0; i < pl2.length; i++) {
      if (pl2[i].id === item.id) {
        pl2[i] = item;
        //setpassengerList(pl2);
        dispatch( actionsPassengerReducer.setpassengersList(pl2) );
        return;
      }
    }
  }

  // submit passengers data and go to payment page
  const doSubmitPassengers = () => {
    console.log('seats=', storepurchaseSeats.length, 'passengers=', passengerList.length);
    if (storepurchaseSeats.length !== passengerList.length) {
      alert(`Ошибка! Кол-во купленных мест (${storepurchaseSeats.length}) не равно кол-ву пассажиров (${passengerList.length})`);
      return;
    } else {
      navigate('/payment');
    }
  }

  useEffect( () => {
    dispatch( actionsTicketReducer.setnavigationProgressActive(2) );
    window.scrollTo(0,0);
  },[])

  //
  return (<>
  <div className="TSHeader">
    <HeaderLogoNavi/>
    
    <div className="tsform">
      <TicketSearchForm  direction='row' isFixed={false}/>
    </div>

    <NavigationProgress />
  </div>  

  <div className="TSBody">
    <TripDetails />

    <div>
      { passengerList.map( (item) => {
        return <div key={item.id}>
          <PassengerAddForm 
            p={item}
            handleRemovePassenger={handleRemovePassenger}
            handleUpdatePassenger={handleUpdatePassenger}
          />
        <hr />
        </div>
      }) } 
      
      <div className="divAddMore">
        <h3>Добавить пассажира</h3>
        <img className="divAddMore__img" src={psngrShow} alt="" onClick={handleAddPassenger} />
      </div>
      
      <div className="button-wrapper">
        <button className="pageSeatSelect_forwardBtn" onClick={doSubmitPassengers}>Далее</button>
      </div>
    </div>
  </div>

  <div className="TSFooter">
      <Footer/>
  </div>
  </>
  )
}


