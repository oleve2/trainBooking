
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect } from "react";

import HeaderLogoNavi from "../components/HeaderLogoNavi"
import Footer from "../components/Footer"

// styles
import './PageOrderSuccess.css';

// images
import img_p1 from '../assets/order_success/ordSucc_p1.png';
import img_p2 from '../assets/order_success/ordSucc_p2.png';
import img_p3 from '../assets/order_success/ordSucc_p3.png';
import star   from '../assets/order_success/Star.png';

//
export default function PageOrderSuccess() {
  const navigate = useNavigate();

  // store
  const storepaymentInfo = useSelector((store) => store.passengerReducer.paymentInfo)

  const doGoHome = () => {
    navigate('/');
  }

  useEffect( () => {
    window.scrollTo(0,0)
  },[])

  //
  return (<>
  <div className="TSHeader_Success">
    <HeaderLogoNavi/>
  </div>  
  
  <div className="divSuccess">
    <div className="divSuccess__title">
      Благодарим Вас за заказ!
    </div>

    <div className="divSuccess__form">
      <div className="dScFrm_div dScFrm_header">
        <div className="dScFrm_header__order">№Заказа ???</div>
        <div className="dScFrm_header__sum">сумма <b>???</b> р.</div>
      </div>

      <div className="dScFrm_div dScFrm_info">
        <div className="dScFrm_info__block">
          <img className="dScFrm_info__img" src={img_p1} alt="pic1" />
          <div className="dScFrm_info__text">билеты будут отправлены на ваш e-mail</div>
        </div>

        <div className="dScFrm_info__block">
          <img className="dScFrm_info__img" src={img_p2} alt="pic2" />
          <div className="dScFrm_info__text">распечатайте и сохраняйте билеты до даты поездки</div>
        </div>

        <div className="dScFrm_info__block">
          <img className="dScFrm_info__img" src={img_p3} alt="pic3" />
          <div className="dScFrm_info__text">предьявите распечатанные билеты при посадке</div>
        </div>
      </div>

      <div className="dScFrm_div dScFrm_message">
        <div className="dScFrm_message__FIO">{storepaymentInfo.firstName} {storepaymentInfo.secondName} {storepaymentInfo.thirdName}!</div>
        <div className="dScFrm_message__text">Ваш заказ успешно оформлен.</div>
        <div className="dScFrm_message__text">В ближайшее время с вами свяжется наш оператор для подтверждения.</div>
        <div className="dScFrm_message__thanks">Благодарим Вас за оказанное доверие и желаем приятного путешествия!</div>
      </div>

      <div className="dScFrm_div dScFrm_footer">
        <div className="dScFrm_footer">
          <div className="dScFrm_footer__text">Оценить сервис</div>
          <div className="dScFrm_footer__stars">
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
          </div>
        </div>

        <div className="dScFrm_footer__buttonHome" onClick={doGoHome}>Вернуться на главную</div>
      </div>
    </div>
  </div>

  <div className="TSBody_Success">
  </div>

  <div className="TSFooter">
    <Footer/>
  </div>  
  </>)
}
