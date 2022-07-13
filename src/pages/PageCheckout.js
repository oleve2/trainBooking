
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionsTicketReducer } from "../rtkstore/ticketReducer";

// components
import HeaderLogoNavi from "../components/HeaderLogoNavi";
import TicketSearchForm from "../components/TicketSearchForm"
import Footer from "../components/Footer";
import NavigationProgress from "../components/NavigationProgress";

//
export default function PagePayment(props) {
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( actionsTicketReducer.setnavigationProgressActive(4) );
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
    page checkout

  </div>


  <div className="TSFooter">
      <Footer/>
  </div>
  </>
  )
}

