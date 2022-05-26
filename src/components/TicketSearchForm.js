import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketSearchForm.css';
import { useDispatch, useSelector } from 'react-redux';

import { actionsTicketReducer } from '../rtkstore/ticketReducer';

export default function TicketSearchForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // store 
  const storeCityFrom = useSelector( (store) => store.ticketReducer.searchParams.cityFrom);
  const storeCityTo = useSelector( (store) => store.ticketReducer.searchParams.cityTo);

  // cities
  const [isCityFromSelected, setisCityFromSelected] = useState(false);
  const [cityFrom, setCityFrom] = useState([]);  //
  const [flgCityFromLoaded, setflgCityFromLoaded] = useState(false); // flag cityFrom loaded
 
  const [isCityToSelected, setIsCityToSelected] = useState(false);
  const [cityTo, setCityTo] = useState([]);
  const [flgCityToLoaded, setflgCityToLoaded] = useState(false); // flag cityTo loaded

  const [cityFromStr, setcityFromStr] = useState('');
  const [cityToStr, setcityToStr] = useState('');

  // dates
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // ticket form direction to display
  const [dir, setDir] = useState(props.direction); // 'column' or 'row'
  const changeDir = () => { (dir === 'column') ? setDir('row') : setDir('column'); }

  // functions
  const storeSetDateFrom = (val) => { dispatch(actionsTicketReducer.setCityFrom(val)) }
  const storeSetDateTo = (val) => { dispatch(actionsTicketReducer.setCityTo(val)) }
  const handleClick = () => { navigate('/ticket_select') }

  const handleCityFromInputChange = (e) => { 
    setisCityFromSelected(false);
    setcityFromStr(e.target.value) 
  }
  const handleCityToInputChange = (e) => { 
    setIsCityToSelected(false);
    setcityToStr(e.target.value) 
  }

  // https://erikmartinjordan.com/start-search-user-not-typing
  // city from
  useEffect( () => {
    async function getData1() {
      let resp = await fetch(`https://fe-diplom.herokuapp.com/routes/cities?name=${cityFromStr}`);
      let data = await resp.json();
      console.log('from ', data);
      setCityFrom(data);
      setflgCityFromLoaded(true);
    }
    let timer1 = setTimeout( async () => {
      if(cityFromStr !== '') {
        setflgCityFromLoaded(false);
        await getData1();
      } else {
        setCityFrom([]);
      }
    }, 500);
    return () => clearTimeout(timer1);
  }, [cityFromStr])

  // city to
  useEffect( () => {
    async function getData2() {
      let resp = await fetch(`https://fe-diplom.herokuapp.com/routes/cities?name=${cityToStr}`);
      let data = await resp.json();
      console.log('to ', data);
      setCityTo(data);
      setflgCityToLoaded(true);
    }
    let timer2 = setTimeout( async () => {
      if(cityToStr !== '') {
        setflgCityToLoaded(false);
        await getData2();
      } else {
        setCityTo([]);
      }
    }, 500);
    return () => clearTimeout(timer2);
  }, [cityToStr])

  /*
  useEffect( () => {
    
  }, [])
  */
  // ---------------------------------------------------
  return (
    <div className='ticketForm'>

    <form className='ticketSearchForm'>
      <div className={(dir === 'column' ? 'dirColumn' : 'dirRow')}>
        <div style={{height: '100px', margin: '40px'}}>
          <label>Направление</label>
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <div>
              <input className="FInput" onChange={handleCityFromInputChange} value={cityFromStr}/>
              { (flgCityFromLoaded && !isCityFromSelected)
                ? <div style={{display: 'flex', flexDirection: 'column'}}>
                { cityFrom.map( (item) => {
                  return <div key={item._id} className='listDivDropDown' onClick={() => {
                    setcityFromStr(item.name);
                    storeSetDateFrom(item);
                    setisCityFromSelected(true);
                  }}
                  >{item.name}</div>
                }) }              
                </div>
              : <></>
              }
            </div>
            
            <img src="" alt="switch" className='tsf_img' style={{width: '50px', height:'50px'}} onClick={changeDir} />

            <div>
              <input className="FInput" onChange={handleCityToInputChange} value={cityToStr} />
              { (flgCityToLoaded && !isCityToSelected)
                ? <div style={{display: 'flex', flexDirection: 'column'}}>
                { cityTo.map( (item) => {
                  return <div key={item._id} className='listDivDropDown' onClick={() => {
                    setcityToStr(item.name);
                    storeSetDateTo(item);
                    setIsCityToSelected(true);
                  }}>{item.name}</div> 
                }) }
                  </div>
                : <></> 
              }
          </div>
        </div>
      </div>
        
        {/* 2 */}
        <div style={{height: '100px', margin: '40px'}}>
          <label>Дата Откуда</label> 
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <input className="FInput" type="date" onChange={(e) => {setDateFrom(e.target.value)}} />
            <img src="" alt="switch" className='tsf_img' style={{width: '50px', height:'50px'}} onClick={changeDir} />
            <input className="FInput" type="date" onChange={(e) => {setDateTo(e.target.value)}} />    
          </div>
        </div>

      </div>
      
      {/* 3 */}
      <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '40px', marginBottom: '40px'}}>
        <button className='tsf_button' type="button" onClick={handleClick}>Найти билеты</button>
      </div>
      
    </form>
    
    {/*
    <div>cityFrom:{JSON.stringify(cityFrom)}</div>        <br />
    <div>cityTo:{JSON.stringify(cityTo)}</div>            <br />
    <div>cityFromStr:{JSON.stringify(cityFromStr)}</div>     
    <div>cityToStr:{JSON.stringify(cityToStr)}</div>       <br />

    <div>storeCityFrom:{JSON.stringify(storeCityFrom)}</div>
    <div>storeCityTo:{JSON.stringify(storeCityTo)}</div>   <br />
    */}
    </div>
  )
}


