
import coachBase from '../assets/coach_base.png'

// https://stackoverflow.com/questions/48474/how-do-i-position-one-image-on-top-of-another-in-html

export default function Coach_PickSeat(props) {
  return (<>
    <div style={{display:'flex'}}>
      <img src={coachBase} alt="_вагон_" style={{margin:'0 auto'}}/>
    </div>  
  </>)
}


