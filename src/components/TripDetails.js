
import { useSelector } from "react-redux"

export default function TripDetails(props) {
  // store
  const storepurchaseTrain = useSelector( (store) => store.ticketReducer.purchaseTrain )
  const storepurchaseSeats = useSelector( (store) => store.ticketReducer.purchaseSeats )

  //
  return (<>
  <div style={{overflowX:'scroll'}}>
    <h3>TripDetails</h3>

    <div>
      Туда
    </div>
    <hr />

    <div>
      Обратно
    </div>
    <hr />

    <div>
      Пассажиры
    </div>
    <hr />

    <div>
      Итог
    </div>
    <hr />

    <h4>train info</h4>
    <div>{JSON.stringify(storepurchaseTrain)}</div>
    
    <h4>seats info</h4>
    <div>{JSON.stringify(storepurchaseSeats)}</div>
  </div>
  </>)
}
