
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionsTicketReducer } from "../rtkstore/ticketReducer";
import { useNavigate } from "react-router-dom";

// components
import HeaderLogoNavi from "../components/HeaderLogoNavi";
import TicketSearchForm from "../components/TicketSearchForm"
import Footer from "../components/Footer";
import NavigationProgress from "../components/NavigationProgress";
import TripDetails from "../components/TripDetails";
import TicketSingle from "../components/TicketSingle";
import CheckPassenger from "../components/CheckPassenger";

//styles
import './PageCheckout.css';


//
export default function PagePayment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // store
  const storepurchaseTrainDetails = useSelector((store) => store.ticketReducer.purchaseTrainDetails);
  const storepassengersList       = useSelector((store) => store.passengerReducer.passengersList);
  const storepaymentInfo          = useSelector((store) => store.passengerReducer.paymentInfo)

  // 
  const doChangePayment = () => {
    navigate('/payment');
  }
  const doSubmitCheck = () => {
    navigate('/order_success');
  }
  const doChangePassengers = () => {
    navigate('/passengers');
  }

  //
  useEffect( () => {
    dispatch( actionsTicketReducer.setnavigationProgressActive(4) );
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
      <div className="pgchk__title">
        <h3>Поезд</h3>
      </div>      
      <div className="pgchk_tickerWrp">
        <TicketSingle 
          ticket={storepurchaseTrainDetails}
          usedPage="checkout"
        />
      </div>

      <div style={{maxWidth:'900px'}}>
        <div className="pgchk__title">
          <h3>Пассажиры</h3>
        </div>
        <div className="pgchk_wrpFlx">
          <div className="pgchk__pLeft">
            { storepassengersList.map( (item, ind) => {
              return <div key={ind}>
                <CheckPassenger p={item}/>
              </div>
            }) }
          </div>
          
          <div className="pgchk__pRight">
            <button type="button" className="btn_change" onClick={doChangePassengers}>Изменить</button>
          </div>
        </div>
        
        <div className="pgchk__title">
          <h3>Способ оплаты</h3>
        </div>
        <div className="pgchk_wrpFlx">
          <div className="pgchk__pLeft">
            <div>{(storepaymentInfo.payOnline) ? 'Оплата онлайн' : 'Оплата наличными'}</div>
          </div>

          <div className="pgchk__pRight">
            <button type="button" className="btn_change" onClick={doChangePayment}>Изменить</button>
          </div>
        </div>

        <div className="pgchk__wrpSubmit">
          <div className="pgchk__pLeft"></div>
          <button className="pagePayment-btnSubmit" onClick={doSubmitCheck}>Подтвердить</button>
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

