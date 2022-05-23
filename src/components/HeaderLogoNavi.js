
import './HeaderLogoNavi.css';
import Navigation from './Navigation';

export default function HeaderLogoNavi(props) {
  return (
    <>
    <div className="logo_header">
      <div className="logo_header__wrapperLogotype"> 
        <h3 className="logo_header__logotype">Лого</h3> 
      </div>
      <div className="logo_header__wrapperNav"> 
        <Navigation wrapperClass="logo_header__nav"/> 
      </div>     
    </div>
    </>
  )
}


