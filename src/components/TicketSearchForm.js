import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketSearchForm.css';
import { useDispatch, useSelector } from 'react-redux';

import { actionsTicketReducer } from '../rtkstore/ticketReducer';
import { fetchCityFrom } from '../rtkstore/ticketReducer';

export default function TicketSearchForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // store 
  const storeCityFrom = useSelector( (store) => store.ticketReducer.searchParams.cityFrom);
  const storeCityTo   = useSelector( (store) => store.ticketReducer.searchParams.cityTo);

  // cities
  const [cityFromStr, setcityFromStr] = useState( (storeCityFrom.name == undefined) ? '' : storeCityFrom.name ); //''
  const [cityFrom, setCityFrom] = useState([]);  // init from store
  const [isCityFromSelected, setisCityFromSelected] = useState(false);
  const [flgCityFromLoaded, setflgCityFromLoaded] = useState(false); // flag cityFrom loaded
  const [flgCityFromShow, setflgCityFromShow] = useState(false);  // flag show
  const [cityFromHover, setcityFromHover] = useState(false); // hover over list of cities

  const [cityToStr, setcityToStr] = useState(  (storeCityTo.name == undefined) ? '' : storeCityTo.name  ); //''
  const [cityTo, setCityTo] = useState([]); // init from store
  const [isCityToSelected, setIsCityToSelected] = useState(false);
  const [flgCityToLoaded, setflgCityToLoaded] = useState(false); // flag cityTo loaded
  const [flgCityToShow, setflgCityToShow] = useState(false);  // flag show
  const [cityToHover, setcityToHover] = useState(false); // hover over list of cities 
  

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
  /**/
  const fetchCity = async (str) => {
    let resp = await fetch(`https://fe-diplom.herokuapp.com/routes/cities?name=${str}`); //cityFromStr
    let data = await resp.json();
    return data;
  }

  // city from
  useEffect( () => {
    let timer1 = setTimeout( async () => {
      let cityFromStr2 = (cityFromStr === '') ? 'а' : cityFromStr;
      setflgCityFromLoaded(false);
      let data = await fetchCity(cityFromStr2);
      setCityFrom(data);
      setflgCityFromLoaded(true);
    }, 500);
    return () => clearTimeout(timer1);
  }, [cityFromStr])

  // city to
  useEffect( () => {
    let timer2 = setTimeout( async () => {
      let cityToStr2 = (cityToStr === '') ? 'а' : cityToStr;
      setflgCityToLoaded(false);
      let data = await fetchCity(cityToStr2);
      setCityTo(data);
      setflgCityToLoaded(true);
    }, 500);
    return () => clearTimeout(timer2);
  }, [cityToStr])

  /*
  useEffect( () => {
    console.log('11=', storeCityFrom.name);
    setcityFromStr(storeCityFrom.name);
    setcityToStr(storeCityTo.name);
  }, [])
  */

  // ---------------------------------------------------
  return (
    <div className='ticketForm'>
    {/*
    <div>cityFrom:{JSON.stringify(cityFrom)}</div>        <br />  
    <div>flgCityFromShow:{JSON.stringify(flgCityFromShow)}</div>
    <div>isCityFromSelected:{JSON.stringify(isCityFromSelected)}</div>
    <div>cityFromHover:{JSON.stringify(cityFromHover)}</div>  <br /> 

    <div>cityTo:{JSON.stringify(cityTo)}</div>        <br />  
    <div>flgCityToShow:{JSON.stringify(flgCityToShow)}</div>   
    <div>isCityToSelected:{JSON.stringify(isCityToSelected)}</div>     
    <div>cityToHover:{JSON.stringify(cityToHover)}</div>  <br /> 
    */}

    <form className='ticketSearchForm'>
      <div className={(dir === 'column' ? 'dirColumn' : 'dirRow')}>
        <div style={{height: '100px', margin: '40px'}}>
          <label>Направление</label>
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <div
              onFocus={ () => {setflgCityFromShow(true)}} 
              onBlur={ () => { 
                if (cityFromHover === true) {
                  setflgCityFromShow(true);
                } else {
                  setflgCityFromShow(false);
                  setcityFromHover(false);
                }
              }}
            >
              <input className="FInput" value={cityFromStr} 
                onChange={handleCityFromInputChange} 
              />
              { ((flgCityFromLoaded && !isCityFromSelected) && flgCityFromShow)
                ? <div className='listDiv' 
                  onMouseEnter={() => { setcityFromHover(true) }} 
                  onMouseLeave={() => { setcityFromHover(false) }}
                  >
                { cityFrom.map( (item) => {
                  return <div key={item._id} className='listDiv__dropdown' 
                    onClick={() => {
                      setcityFromStr(item.name);
                      storeSetDateFrom(item); // set to store
                      setisCityFromSelected(true);
                      setflgCityFromShow(false);
                      setcityFromHover(false);
                    }}
                  >{item.name}</div>
                }) }              
                </div>
                : <></>
              }
            </div>
            
            <img src="" alt="switch" className='tsf_img' style={{width: '50px', height:'50px'}} onClick={changeDir} />

            <div 
              onFocus={() => {setflgCityToShow(true)}}
              onBlur={ () => { 
                if (cityToHover === true) {
                  setflgCityToShow(true)
                } else {
                  setflgCityToShow(false);
                  setcityToHover(false);
                }
              }}
            >
              <input className="FInput" value={cityToStr}
                onChange={handleCityToInputChange}  
              />
              { ( (flgCityToLoaded && !isCityToSelected) && flgCityToShow )
                ? <div className='listDiv'
                  onMouseEnter={() => { setcityToHover(true) }} 
                  onMouseLeave={() => { setcityToHover(false) }}
                  >
                { cityTo.map( (item) => {
                  return <div key={item._id} className='listDiv__dropdown' 
                    onClick={() => {
                      setcityToStr(item.name);
                      storeSetDateTo(item); // set to store
                      setIsCityToSelected(true);
                      setflgCityToShow(false);
                      setcityToHover(false);
                    }}
                  >{item.name}</div> 
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

    </div>
  )
}


