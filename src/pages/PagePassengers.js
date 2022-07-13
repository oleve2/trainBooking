
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionsTicketReducer } from "../rtkstore/ticketReducer";

// components
import HeaderLogoNavi from "../components/HeaderLogoNavi";
import TicketSearchForm from "../components/TicketSearchForm"
import Footer from "../components/Footer";
import NavigationProgress from "../components/NavigationProgress";

import TripDetails from "../components/TripDetails";
import PassengerAddForm from "../components/PassengerAddForm";


//
export default function PagePassengers(props) {
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( actionsTicketReducer.setnavigationProgressActive(2) );
  },[])

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
      <PassengerAddForm />

      <div>Форма добавления пассажира</div>

      <button>Добавить пассажира</button>
    </div>
  </div>


  <div className="TSFooter">
      <Footer/>
  </div>
  </>
  )
}


