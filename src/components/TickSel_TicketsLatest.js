// styles
import './TickSel_TicketsLatest.css';


export default function TickSel_TicketsLatest(props) {
  return (<>
    <div className="TSLatest block">
    <h3 style={{marginBottom: '15px'}}>Последние билеты</h3> 

    { props.ticketsLast.map( (item, index) => {
      return <div key={index} className='latest-wrapper'>
        <div className='place'>
          <div className='place-from'>
            <div className='city'>{item.departure.from.city.name}</div>
            <div className='station'>{item.departure.from.railway_station_name}</div>
          </div>
          <div className='place-to'>
            <div className='city'>{item.departure.to.city.name}</div>
            <div className='station'>{item.departure.to.railway_station_name}</div>
          </div>  
        </div>
      
        <div className='serv'>
          <div className='serv-wrapper'>
            <div className='serv_img'>
              {/*<img className='serv_img serv-wifi' src="" alt="wifi" />*/}
              wifi: {JSON.stringify(item.have_wifi)}
            </div>
            <div className='serv_img'>
              {/*<img className='serv_img serv-express' src="" alt="express" />*/}
              expr: {JSON.stringify(item.is_express)}
            </div>
            <div className='serv_img'>
              {/*<img className='serv_img serv-conditioning' src="" alt="conditioning" />*/}
              cond: {JSON.stringify(item.have_air_conditioning)}
            </div>
            
          </div>
          <div className='serv-minprice'>от {item.min_price} р.</div>
        </div>
      </div>
    }) }
  </div>
  </>
  )
}
