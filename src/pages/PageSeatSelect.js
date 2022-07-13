
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionsTicketReducer } from "../rtkstore/ticketReducer";

// styles
import './PageTicketSelect.css';
import './PageSeatSelect.css';

// components
import TicketSearchForm from "../components/TicketSearchForm";
import Footer from "../components/Footer";
import HeaderLogoNavi from "../components/HeaderLogoNavi";
import Coach from "../components/Coach";
import NavigationProgress from "../components/NavigationProgress";

// left side panels
import TickSel_SearchPanel    from "../components/TickSel_SearchPanel";
import TickSel_TicketsLatest  from "../components/TickSel_TicketsLatest";
// slider
//import TickSel_Slider from "../components/TickSel_Slider";

// fetch url
const baseURL = process.env.REACT_APP_BASE_URL;


/*
Components: 
- Coach.js (схема вагона)
*/

//
export default function PageSeatSelect(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // store
  const storeTicketsLast = useSelector( (store) => store.ticketReducer.ticketsLast);
  const storepurchaseTrain = useSelector( (store) => store.ticketReducer.purchaseTrain);
  const storepurchaseSeats = useSelector( (store) => store.ticketReducer.purchaseSeats);

  // train id from url
  const {trainId} = useParams();
  //
  const [seatData, setseatData] = useState([]);
  const [seatDataLoaded, setseatDataLoaded] = useState(false);

  // click Forward
  const doClickForward = () => {
    //console.log('storepurchaseTrain=', storepurchaseTrain, storepurchaseTrain.train_id);
    //console.log('storepurchaseSeats=', storepurchaseSeats, storepurchaseSeats.length);
    if (storepurchaseSeats.length === 0) {
      alert("Вы не выбрали ни одного билета!");
    } else {
      navigate('/passengers');
    }
  }

  // page initialization
  useEffect( () => {
    async function getData(trainId) {
      let url = `${baseURL}/routes/${trainId}/seats`;
      //console.log(`url=${url}`);
      let resp = await fetch(url);
      let data = await resp.json();
      setseatData(data);
      setseatDataLoaded(true);
    };
    
    //
    if (storepurchaseTrain.train_id !== undefined) {
      window.scrollTo(0,0); // scroll up
      getData(trainId);     // fetch data
      dispatch( actionsTicketReducer.setnavigationProgressActive(1) );
    } else {
      navigate('/ticket_select');
    }
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
      <div> 
        <TickSel_SearchPanel />

        <TickSel_TicketsLatest ticketsLast={storeTicketsLast}/>
      </div>

      {/* список вагонов (отфильтрованный) и места какие в них есть */}
      <div> 
        <div>
          <div>
            train ID: {trainId}
          </div>
          
          {/**/}
          { (seatDataLoaded) 
            ? <>
              { seatData.map( (item, index) => {
                return <div key={index}>
                  <Coach data={item} />
                </div>
              })
              }            
            </>
            : <></> 
          }
        </div>
          
        <button className="pageSeatSelect_forwardBtn" onClick={doClickForward}>Далее</button>
      </div>
    </div>

    <div className="TSFooter">
      <Footer/>
    </div>
  </>)
}
