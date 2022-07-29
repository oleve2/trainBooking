// styles
import './TickSel_TicketsLatest.css';

// images
import latest_wifi    from '../assets/seatsel_serv/latest_wifi.png';
import latest_express from '../assets/seatsel_serv/latest_express.png';
import latest_meal    from '../assets/seatsel_serv/latest_meal.png';

export default function TickSel_TicketsLatest(props) {
  return (<>
    <div className="TSLatest block">
    <h3 className="tsl__title">Последние билеты</h3> 

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
              <img className={'serv_img ' + ( (item.have_wifi) ? 'serv_img_active' : '' )} src={latest_wifi} alt="wifi" />
            </div>

            <div className='serv_img'>
              <img className={'serv_img'} src={latest_express} alt="express" />
            </div>

            <div className='serv_img'>
              <img className={'serv_img'} src={latest_meal} alt="conditioning" />
            </div>
          </div>

          <div className='serv-minprice'>
            <span className="serv-minprice__from">от </span>
            <span className="serv-minprice__sum">{item.min_price} </span>
            <span className="serv-minprice__currency">р.</span>
          </div>
        </div>
      </div>
    }) }
  </div>
  </>
  )
}
