
import '../pages/PageTicketSelect.css';

export default function TickSel_TicketsLatest(props) {
  return (<>
    <div className="TSLatest block">
    <h3 style={{marginBottom: '15px'}}>Последние билеты</h3> 
    { props.ticketsLast.map( (item, index) => {
      return <div style={{marginBottom: '10px'}} key={index}>
        <div>from: {item.departure.from.city.name}({item.departure.from.railway_station_name})</div>
        <div>to: {item.departure.to.city.name}({item.departure.to.railway_station_name})</div>
        <div>wifi:{JSON.stringify(item.have_wifi)} / express:{JSON.stringify(item.is_express)} / conditioning:{JSON.stringify(item.have_air_conditioning)}</div>
        <div>от {item.min_price} р.</div>
      </div>
    }) }
  </div>
  </>
  )
}
