
import { useState, useEffect } from "react"

/**
 * 
 */

export default function TicketSingleSeats(props) {
  //
  const [flgShow, setflgShow] = useState(false);

  //
  return ( 
  <div>
    <div onClick={() => { setflgShow(!flgShow) }} style={{display:'flex', justifyContent:'space-around'}}> {/* border:'1px solid red',  */}
      <div>classTitle: {props.classTitle} </div>
      <div>cntLeft: {props.cntLeft}</div>
      <div>от {props.seatPrices.bottom_price} р.</div>  {/*JSON.stringify(props.seatPrices.bottom_price)*/}
    </div>
    
    { (flgShow) 
      ? <div> {/* seatPrices:  <br /> { JSON.stringify(props.seatPrices) } */}
      { Object.keys(props.seatPrices).map( (item) => {
        return <div key={item}>{item} / {props.seatPrices[item]}</div>
      }) }
      </div>
      : <></> 
    }
    

  </div>
  ) 
}


