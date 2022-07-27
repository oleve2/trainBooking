
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

/*  
props:
- data
- changer(val)
*/

//
export default function Switcher(props) {
  //const [isChecked, setIsChecked]= useState(props.data);
  
  return ( 
  <div style={{width: 'fit-content', padding: '0 20px 0 0'}}> {/* border: '1px solid black',  */}
    <FormControlLabel
      value="start"
      control={<Switch color="warning" />}
      label={props.label} /*"Start"*/
      labelPlacement="start"
      color="warning"
      checked={props.data}
      onChange={() => {props.changer(!props.data) }}  //setIsChecked(!isChecked)}
    /> 
    {/*
    <div style={{textAlign: 'center'}}>{JSON.stringify(isChecked)}</div>  
    */}
  </div>
  )
}
