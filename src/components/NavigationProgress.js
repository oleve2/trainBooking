
import { useSelector } from 'react-redux';

import './NavigationProgress.css';

//
export default function NavigationProgress() {
  // store
  const storenavigationProgressList   = useSelector( (store) => store.ticketReducer.navigationProgressList);
  const storenavigationProgressActive = useSelector( (store) => store.ticketReducer.navigationProgressActive);
  
  return (
    <div className="navtick_list">
      { storenavigationProgressList.map((item) => {
        return <div key={item.id} className={"navtick_list__item " + ((item.id <= storenavigationProgressActive) ? 'item_active' : '')}>
          <div className="divIdCircle">{item.id}</div> 
          <div>{item.name}</div>
      </div>
      }) }
    </div>
  )
}


