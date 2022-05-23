import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketSearchForm.css';

export default function TicketSearchForm(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ticket_select');
  }

  const [cityFrom, setCityFrom] = useState(['', 'val_11','val_12','val_13','val_14','val_15']);
  const [cityTo, setCityTo] = useState(['', 'val_21','val_22','val_23','val_24','val_25']);
  
  const [cityFromSelected, setCityFromSelected] = useState('');
  const [cityToSelected, setCityToSelected] = useState('');

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [dir, setDir] = useState(props.direction); // 'column' or 'row'

  const changeDir = () => {
    (dir === 'column') ? setDir('row') : setDir('column');
  }

  return (
    <div className='ticketForm'>

    <form className='ticketSearchForm'>
      <div className={(dir === 'column' ? 'dirColumn' : 'dirRow')}>
        <div style={{height: '100px', margin: '40px'}}>
          <label>Направление</label>
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <div>
              <input className="FInput" list="city_from_list" type="text" name="city_from" onChange={(e) => {setCityFromSelected(e.target.value)}} />
              <datalist id="city_from_list">
              { cityFrom.map( (item) => {
                return <option key={item} value={item}/>
              }) }
              </datalist>
            </div>
            
            <img src="" alt="switch" className='tsf_img' style={{width: '50px', height:'50px'}} onClick={changeDir} />

            <div>
              <input className="FInput" list="city_to_list" type="text" name="city_to" onChange={(e) => {setCityToSelected(e.target.value)}} />
              <datalist id="city_to_list">
              { cityTo.map( (item) => {
                return <option key={item} value={item}/>
              }) }
              </datalist>
            </div>
          </div>
        </div>

        <div style={{height: '100px', margin: '40px'}}>
          <label>Дата Откуда</label> 
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <input className="FInput" type="date" onChange={(e) => {setDateFrom(e.target.value)}} />
            <img src="" alt="switch" className='tsf_img' style={{width: '50px', height:'50px'}} onClick={changeDir} />
            <input className="FInput" type="date" onChange={(e) => {setDateTo(e.target.value)}} />    
          </div>
        </div>
      </div>
      
      <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '40px', marginBottom: '40px'}}>
        <button className='tsf_button' type="button" onClick={handleClick}>Найти билеты</button>
      </div>
      
    </form>
    </div>
  )
}


