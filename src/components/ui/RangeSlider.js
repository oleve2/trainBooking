
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';



/*
Props:
  - props.min
  - props.max
  - props.rangeName
  - props.rangeWidth
  - props.topLevelDebouncer
*/ 

// 
export default function RangeSlider(props) {
  const [value, setValue] = useState(props.value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.topLevelDebouncer(newValue);
  };

  return (
    <div style={{width: 'fit-content', padding: '10px'}} >
      <div onClick={() => {console.log(value)}}>{props.rangeName}</div>
      <Box sx={{ width: props.rangeWidth }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          color="warning"
          min={props.min}
          max={props.max}
        />
      </Box>
      <span>от {value[0]} ~ до {value[1]}</span>
    </div>
  );
}


