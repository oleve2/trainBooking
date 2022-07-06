
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// styles
import './TickSel_Slider.css';

// tickets reducer
import { actionsTicketReducer } from '../rtkstore/ticketReducer';
import { fetchRoutes, makeCalcsAAA } from '../rtkstore/ticketReducer';

/*
props:
- total_count (сколько билетов нашлось - может бьть и 0)
*/ 
export default function TickSel_Slider(props) {
  const dispatch = useDispatch();

  // store
  const storeticketsPerPage = useSelector( (store) => store.ticketReducer.ticketsPerPage );
  const storeCityFrom       = useSelector( (store) => store.ticketReducer.searchParams.cityFrom );
  const storeCityTo         = useSelector( (store) => store.ticketReducer.searchParams.cityTo );

  // more store vals
  const storecntBlocks        = useSelector( (store) => store.ticketReducer.cntBlocks );   //, setcntBlocks] = useState(0);
  const storesliderBlockList  = useSelector( (store) => store.ticketReducer.sliderBlockList );   //, setsliderBlockList] = useState([]);
  const storesliderActive     = useSelector( (store) => store.ticketReducer.sliderActive );   //, setsliderActive] = useState(1);

  // page div select handler
  const handlePageSelect = (num) => {
    dispatch( actionsTicketReducer.setsliderActive(num) );  //setsliderActive(num);
    dispatch( actionsTicketReducer.settoffset(num - 1) );
    dispatch( fetchRoutes() ); //storeCityFrom._id, storeCityTo._id
  }

  const buttonLeft = () => {
    if ((storesliderActive <= storecntBlocks) && (storesliderActive > 1)) {
      let newNum = storesliderActive - 1;
      handlePageSelect(newNum);
    }     
  }

  const buttonRight = () => {
    if ((storesliderActive >= 1) && (storesliderActive < storecntBlocks)) {
      let newNum = storesliderActive + 1;
      handlePageSelect(newNum);
    } 
  }


  //
  useEffect( () => {
    dispatch( makeCalcsAAA(storeticketsPerPage, props.total_count) );        // recalc elements
    dispatch( actionsTicketReducer.setsliderActive(1) );   //setsliderActive(1); // reset slider active state
    dispatch( actionsTicketReducer.settoffset(0) );
  },[storeticketsPerPage, props.total_count])


  //
  return (
    <div>
      <div className="_TicketSlider">
      <h4>Крутилка</h4>
      <div>Всего билетов: {props.total_count} Показывать на странице: {storeticketsPerPage} storecntBlocks={storecntBlocks} storesliderActive={storesliderActive}</div>
      <div className='slider_blockList'>
        <div className='slider_block' onClick={() => { buttonLeft() }}>
          left
        </div>
        
        { storesliderBlockList.map( (item) => {
          return <div key={item} 
            className={'slider_block ' + ((storesliderActive === item) ? 'sb_active' : '')}
            onClick={() => { handlePageSelect(item) }}
          >
            {item}
          </div>
        }) }
        
        <div className='slider_block' onClick={() => { buttonRight() }}>
          right
        </div>
      </div>
      </div>    
    </div>
  )
}
