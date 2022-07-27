
import RangeSlider from "./ui/RangeSlider"
import debounce from 'lodash.debounce';

// top level debouncer for price setting (изменить названия функций)
const debTimeFrom = (val) => {
  console.log('setting ', val, val[0], val[1]);
  //dispatch( updatepriceRange(val) );
}
const topLeveldebTimeFrom = debounce(debTimeFrom, 1000)

const debTimeTo = (val) => {
  console.log(val, val[0], val[1]);
  //dispatch( updatepriceRange(val) );
}
const topLeveldebTimeTo = debounce(debTimeTo, 1000)


//
export default function TripFromTo(props) {
  return (
    <div style={{margin: '20px 0px'}}>
      <div>{props.title}</div>
      <div>
        <RangeSlider 
          min={0} 
          max={24} 
          value={[0, 24]}
          topLevelDebouncer={topLeveldebTimeFrom}
          rangeName='Время отбытия' rangeWidth='300px'
        />
      </div>
      <div>
        <RangeSlider 
          min={0} 
          max={24} 
          value={[0, 24]}
          topLevelDebouncer={topLeveldebTimeTo}          
          rangeName='Время прибытия' rangeWidth='300px'
        />
      </div>
    </div>
  )
}

