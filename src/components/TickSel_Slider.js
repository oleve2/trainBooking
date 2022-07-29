
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// styles
import './TickSel_Slider.css';

// tickets reducer
import { actionsTicketReducer } from '../rtkstore/ticketReducer';
import { fetchRoutes, makeCalcsAAA } from '../rtkstore/ticketReducer';

// images
import slideLeft from  '../assets/slideLeft.png';
import slideRight from '../assets/slideRight.png';

/*
Props:
- total_count (сколько билетов нашлось - может бьть и 0)
*/ 
export default function TickSel_Slider(props) {
  const dispatch = useDispatch();

  // store
  const storeticketsPerPage = useSelector( (store) => store.ticketReducer.ticketsPerPage );

  // more store vals
  const storecntBlocks        = useSelector( (store) => store.ticketReducer.cntBlocks );
  const storesliderBlockList  = useSelector( (store) => store.ticketReducer.sliderBlockList );
  const storesliderActive     = useSelector( (store) => store.ticketReducer.sliderActive );

  // page div select handler
  const handlePageSelect = (num) => {
    dispatch( actionsTicketReducer.setsliderActive(num) );
    dispatch( actionsTicketReducer.settoffset(num - 1) );
    dispatch( fetchRoutes() );
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
    dispatch( makeCalcsAAA(storeticketsPerPage, props.total_count) );
    dispatch( actionsTicketReducer.setsliderActive(1) );
    dispatch( actionsTicketReducer.settoffset(0) );
  },[storeticketsPerPage, props.total_count])


  //
  return (
    <div className="_TicketSlider">

      <div className='slider_blockList'>
        <div className='slider_block' onClick={() => { buttonLeft() }}>
          <img src={slideLeft} alt="left" />
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
          <img src={slideRight} alt="right" />
        </div>
      </div>
    </div>    
  )
}
