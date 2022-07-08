
import { useState, useEffect } from "react"

import './TicketSingleSeats.css' 

export default function TicketSingleSeats(props) {
  //
  const [flgShow, setflgShow] = useState(false);
  const [titleMapper, settitleMapper] = useState({
    'first': 'Люкс', 
    'second': 'Купе',
    'third': 'Плацкарт',
    'fourth': 'Сидячий'
  })
  const [seatMaper, setseatMaper] = useState({
    'top_price': 'Верхняя койка',
    'bottom_price':'Нижняя койка',
    'side_price':'Боковая койка'
  })

  //
  const doToggle = () => {
    setflgShow(!flgShow);
  }

  //
  return ( 
  <div className="tsSeats__wrapper">
    <div className="tsSeats__info" onClick={doToggle}>
      <div className="tsSeats__innerWrp tsSeats__class">{titleMapper[props.classTitle]}</div>         {/* classTitle:  */}
      <div className="tsSeats__cnt">{props.cntLeft}</div>                         {/* cntLeft:  */}
      <div className="tsSeats__innerWrp tsSeats__price">от {props.seatPrices.bottom_price} р.</div>   {/*JSON.stringify(props.seatPrices.bottom_price)*/}
    </div>
    
    { (flgShow) 
      ? <>
      { Object.keys(props.seatPrices).map( (item) => {
        return <div key={item} className="tsSeats__info tsSeats__bgGrey">
          <div className="tsSeats__innerWrp tsSeats__class">{seatMaper[item]}</div>
          <div className="tsSeats__cnt"></div>
          <div className="tsSeats__innerWrp tsSeats__price">от {props.seatPrices[item]}р.</div>
        </div>
      }) }
      </>
      : <></> 
    }
  </div>
  ) 
}
