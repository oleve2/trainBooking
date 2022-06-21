
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
      <div>class: {props.class} </div>
      <div>cntLeft: {props.cntLeft}</div>
      <div>от ??? р.</div>
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


