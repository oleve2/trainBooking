//import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

/*
props.min
props.max
props.rangeName
props.rangeWidth
*/ 

export default function RangeSlider(props) {
  const [value, setValue] = useState([props.min, props.max]);
  const min = props.min;
  const max = props.max;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /*const valuetext = (value) => {
    return `${value}°C`;  
  }*/

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
          min={min}
          max={max}
        />
      </Box>
      <span>от {value[0]} ~ до {value[1]}</span>
    </div>
  );
}


