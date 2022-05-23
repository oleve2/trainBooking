
import RangeSlider from "./ui/RangeSlider"

export default function TudaObratno(props) {
  return (
    <div style={{margin: '20px 0px'}}>
      <div>{props.title}</div>
      <div>
        <RangeSlider min={0} max={24} rangeName='Время отбытия' rangeWidth='300px'/>
      </div>
      <div>
      <RangeSlider min={0} max={24} rangeName='Время прибытия' rangeWidth='300px'/>
      </div>
    </div>
  )
}

