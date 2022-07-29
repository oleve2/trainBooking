
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

/*  
Props:
- data
- changer(val)
*/

//
export default function Switcher(props) {
  //  
  return ( 
  <div style={{width: 'fit-content', padding: '0 20px 0 0'}}>
    <FormControlLabel
      value="start"
      control={<Switch color="warning" />}
      label={props.label}
      labelPlacement="start"
      color="warning"
      checked={props.data}
      onChange={() => {props.changer(!props.data) }}
    /> 
  </div>
  )
}
