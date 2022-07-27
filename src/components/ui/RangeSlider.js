//import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

/* 
[debouncer]
для информации -  https://dmitripavlutin.com/react-throttle-debounce/
пользовался этим - // https://stackoverflow.com/questions/62522994/how-do-i-lower-the-rate-of-http-requests-triggered-due-to-onchange-for-material
*/

/*
props.min
props.max
props.rangeName
props.rangeWidth
props.topLevelDebouncer
*/ 

/*
const httpReq = (val) => {
  console.log(val, val[0], val[1]);
}
const topLevelDebouncer = debounce(httpReq, 300)
*/

// 
export default function RangeSlider(props) {
  const [value, setValue] = useState(props.value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.topLevelDebouncer(newValue);
  };

  return (
    <div style={{width: 'fit-content', padding: '10px'}} > {/* border: '1px solid black',  */}
      <div onClick={() => {console.log(value)}}>{props.rangeName}</div>
      <Box sx={{ width: props.rangeWidth }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          /*getAriaValueText={(val) => {valuetext(val)}}*/
          color="warning"
          min={props.min}
          max={props.max}
        />
      </Box>
      <span>от {value[0]} ~ до {value[1]}</span>
    </div>
  );
}


