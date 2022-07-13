
import { useDispatch } from 'react-redux';

// images
import { useState } from 'react';
import coachBase from '../assets/coach_base2.png'

// styles
import './Coach_PickSeat.css';

// store
import { SeatsDoAction } from '../rtkstore/ticketReducer';

// https://stackoverflow.com/questions/48474/how-do-i-position-one-image-on-top-of-another-in-html

/* props:
- seatsData
- coachName
*/

//
export default function Coach_PickSeat(props) {
  const dispatch = useDispatch();
  
  const [seatsData, setseatsData] = useState(props.seatsData)

  //
  const clickSeat = (item) => {
    if ((item.selected === undefined) || (item.selected === false)) {
      item.selected = true;
    } else {
      item.selected = false;
    }

    // update store 
    let dataObj = {coachName: props.coachName, seatIndex: item.index, selected: item.selected};
    dispatch( SeatsDoAction(dataObj) );

    // update local var
    let seatsData2 = seatsData.map( (it) => {
      if (it.index === item.index) {
        it.selected = item.selected;
        return it;
      } else {
        return it;
      }
    })
    setseatsData(seatsData2);
  }

  //
  return (<>
    {/*
    <div>{JSON.stringify(seatsData)}</div>
    */}
    <div className="cps-wrapper">
      <img src={coachBase} alt="_вагон_" className="img-coach" />
      
      { seatsData.map( (item) => {
        return <div key={item.index} 
          className={"seat seat_" + item.index + ((item.available) ? ' seat_available' : ' seat_not_available') + 
            ((item.selected === true) ? ' seat_selected' : '') }
          onClick={() => { clickSeat(item) } }
        >{item.index}</div>
      }) }
    </div>
  </>
  )
}
