
// images
import coachBase from '../assets/coach_base2.png'

// styles
import './Coach_PickSeat.css';

// https://stackoverflow.com/questions/48474/how-do-i-position-one-image-on-top-of-another-in-html

export default function Coach_PickSeat(props) {
  return (<>
    {/*
    <div>{JSON.stringify(props.seatsData)}</div>
    */}
    <div className="cps-wrapper">
      <img src={coachBase} alt="_вагон_" className="img-coach" />
      
      { props.seatsData.map( (item) => {
        return <div key={item.index} 
          className={"seat seat_" + item.index + ((item.available) ? ' seat_available' : ' seat_not_available')}
          onClick={() => { console.log(item) }}
        >{item.index}</div>
      }) }
      
    </div>  
  </>)
}
