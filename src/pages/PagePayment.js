
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionsTicketReducer } from "../rtkstore/ticketReducer";
import { useNavigate } from "react-router-dom";

// components
import HeaderLogoNavi from "../components/HeaderLogoNavi";
import TicketSearchForm from "../components/TicketSearchForm"
import Footer from "../components/Footer";
import NavigationProgress from "../components/NavigationProgress";
import TripDetails from "../components/TripDetails";
import { checkPAF } from "../rtkstore/util_functions";


// styles
import './PagePayment.css';

// store
import { actionsPassengerReducer } from "../rtkstore/passengerReducer";

//
export default function PagePayment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // store
  const storepaymentInfo = useSelector( (store) => store.passengerReducer.paymentInfo);

  // form info
  const [firstName, setfirstName]   = useState( checkPAF(storepaymentInfo.firstName) );
  const [secondName, setsecondName] = useState( checkPAF(storepaymentInfo.secondName) );
  const [thirdName, setthirdName]   = useState( checkPAF(storepaymentInfo.thirdName) );

  const [phone, setphone]   = useState( checkPAF(storepaymentInfo.phone) );
  const [email, setemail]   = useState( checkPAF(storepaymentInfo.email) );

  const [payOnline, setpayOnline]   = useState( (storepaymentInfo !== '') ? storepaymentInfo.payOnline : false);
  const [payOffline, setpayOffline] = useState( (storepaymentInfo !== '') ? storepaymentInfo.payOffline: false );

  // validation
  const validatePaymentsObject = (obj) => {
    if (obj.payOnline && obj.payOffline) {
      alert('Ошибка - выбраны оба способа оплаты');
      return false;
    } 
    if (!obj.payOnline && !obj.payOffline) {
      alert('Ошибка - не выбран ни один способ оплаты');
      return false;      
    }
    //
    return true;
  }

  const doSubmitPayments = () => {
    let obj = {
      firstName: firstName,
      secondName: secondName,
      thirdName: thirdName,
      phone: phone,
      email: email,
      payOnline: payOnline,
      payOffline: payOffline,
    }
    let resVal = validatePaymentsObject(obj);
    if (!resVal) {
      return;
    }

    dispatch( actionsPassengerReducer.setpaymentInfo(obj) );
    navigate('/checkout');
  }

  useEffect( () => {
    dispatch( actionsTicketReducer.setnavigationProgressActive(3) );
  },[])

  useEffect( () => {
    setfirstName(firstName);
    setsecondName(secondName);
    setthirdName(thirdName);
    setphone(phone);
    setemail(email);
    setpayOnline(payOnline);
    setpayOffline(payOffline);
  },[firstName, secondName, thirdName, phone, email, payOnline, payOffline])

  
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
    
    <div className="pagePayment-wrapper">
      <div>
        <h3>Персональные данные</h3>
        
        <div className="psngrForm__section"> 
          <div className='vertTab'>
            <label>Фамилия {firstName}</label>
            <input type="text" value={firstName} onChange={(e) => { setfirstName(e.target.value) }}/>
          </div>

          <div className='vertTab'>
            <label>Имя {secondName}</label>
            <input type="text" value={secondName} onChange={(e) => { setsecondName(e.target.value) }}/>
          </div>      
        
          <div className='vertTab'>
            <label>Отчество {thirdName}</label>
            <input type="text" value={thirdName} onChange={(e) => { setthirdName(e.target.value) }}/>
          </div>
        </div>
        
        <div className="psngrForm__section">
          <div className='vertTab'>
            <label>Контактный телефон {phone}</label>
            <input type="text" value={phone} onChange={(e) => { setphone(e.target.value) }}/>          
          </div>
        </div>

        <div className="psngrForm__section">
          <div className='vertTab'>
            <label>email {email}</label>
            <input type="text" value={email} onChange={(e) => { setemail(e.target.value) }}/>          
          </div>
        </div>
      </div>

      <div>
        <h3>Способ оплаты</h3>

        <div className="psngrForm__section">
          <div style={{display:'flex'}}>
            <input type="checkbox" checked={payOnline} onChange={() => { setpayOnline(!payOnline) }}/>
            <h4>Онлайн</h4>
          </div>
        </div>

        <div className="psngrForm__section">
          <div style={{display:'flex', justifyContent:'space-between', height:'60px', alignItems:'center'}}>
            <div style={{marginRight:'30px'}}>Банковской картой</div>
            <div style={{marginRight:'30px'}}>PayPal</div>
            <div style={{marginRight:'30px'}}>Visa Qiwi wallet</div>
          </div>
        </div>

        <div className="psngrForm__section">
          <input type="checkbox" checked={payOffline} onChange={() => { setpayOffline(!payOffline) }}/>
          <h4>Наличными</h4>
        </div>
      </div>

      <div style={{display:'flex', justifyContent:'flex-end'}}>
        <button className="pagePayment-btnSubmit" onClick={doSubmitPayments}>Купить билеты</button> 
      </div>
    </div>
  </div>


  <div className="TSFooter">
      <Footer/>
  </div>
  </>
  )
}
