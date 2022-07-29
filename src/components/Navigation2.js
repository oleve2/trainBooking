
import { HashLink } from 'react-router-hash-link';

export default function Navigation2(props) {
  return (
    <nav className={props.wrapperClass}>
      <ul className="navigation_ul">
        <li className="navigation_li"> <HashLink to='/#aboutUs'>О нас</HashLink> </li>
        <li className="navigation_li"> <HashLink to='/#howItWorks'>Как это работает</HashLink> </li>
        <li className="navigation_li"> <HashLink to='/#reviews'>Отзывы</HashLink> </li>
        <li className="navigation_li"> <HashLink to='/#contacts'>Контакты</HashLink> </li>
      </ul>
    </nav>
  )
}
