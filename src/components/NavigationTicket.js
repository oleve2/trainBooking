
import { useState } from "react"

import './NavigationTicket.css';

export default function NavigationTicket(props) {
  const [navBlocks, setNavBlocks] = useState([
    {id: 1, name: 'Билеты'},
    {id: 2, name: 'Пассажиры'},
    {id: 3, name: 'Оплата'},
    {id: 4, name: 'Проверка'},
  ])

  const [active, setActive] = useState(1);

  return (
    <div className="navtick_list">
      { navBlocks.map((item) => {
        return <div key={item.id} className={"navtick_list__item " + ((item.id === active) ? 'item_active' : '')}>
          <div className="divIdCircle">{item.id}</div> 
          <div>{item.name}</div>
      </div>
      }) }
    </div>
  )
}


