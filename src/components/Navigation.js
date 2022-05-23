import { Link } from "react-router-dom";

export default function Navigation(props) {
  return (
    <nav className={props.wrapperClass}>
      <ul className="navigation_ul">
        <li className="navigation_li"> <Link to='/'>Главная</Link> </li>
        <li className="navigation_li"> <Link to='/ticket_select'>Выбор билета</Link> </li>
        <li className="navigation_li"> <Link to='/payment'>Оплата</Link> </li>
        <li className="navigation_li"> <Link to='/payment_success'>Успешная оплата</Link> </li>
      </ul>
    </nav>
  )
}
