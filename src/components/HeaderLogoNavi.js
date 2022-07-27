
import { useState } from 'react';

import './HeaderLogoNavi.css';
import Navigation from './Navigation';
import Navigation2 from './Navigation2';

export default function HeaderLogoNavi() {
  const [show, setShow] = useState(false);

  const doShow = () => {
    setShow(!show);
  }

  return (
    <>
    <div className="logo_header">
      <div className="logo_header__wrapperLogotype"> 
        <h3 className="logo_header__logotype" >Лого</h3> 
        <div onClick={doShow}>~</div>
      </div>

      { show && 
      <div className="logo_header__wrapperNav"> 
        <Navigation wrapperClass="logo_header__nav"/> 
      </div>     
      }
      <div className="logo_header__wrapperNav"> 
        <Navigation2 wrapperClass="logo_header__nav"/> 
      </div>   

     </div>
    </>
  )
}


