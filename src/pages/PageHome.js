
//import Navigation from "../components/Navigation"

import user from '../assets/userpng.png';
import ekValn from '../assets/valnova_ek.png';
import evgStryk from '../assets/strykalo_evg.png';

import hiw1 from '../assets/hiw_img1.png';
import hiw2 from '../assets/hiw_img2.png';
import hiw3 from '../assets/hiw_img3.png';
import sliderButts from '../assets/slider_buttons.png';

import Footer from '../components/Footer';
import HeaderLogoNavi from '../components/HeaderLogoNavi';



import './PageHome.css';

import TicketSearchForm from "../components/TicketSearchForm";

export default function PageHome(props) {
  return (
  <>

  <div className="homeBlock logo">
    <HeaderLogoNavi />

    <div className="logo_footer">
      <div className="logo_footer__slogan">
        Вся жизнь - <span className="logo_footer__slogan slogan_span">путешествие!</span>
      </div>
      <div className="logo_footer__form">
        <TicketSearchForm direction='column' isFixed={true}/>
      </div>
    </div>
  </div>
  
  <div className="homeBlock aboutUs">
    <div className="aboutUs_wrapper">
      <h3 style={{textTransform: 'uppercase'}}>О нас</h3>
        <ul className="aboutUs_ul">
          <li className="aboutUs_li">Мы рады видеть вас! Мы рботаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем все больше людей заказывают жд билеты через интернет.</li>
          <li className="aboutUs_li">Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? Мы расскажем о преимуществах заказа через интернет.</li>
          <li className="aboutUs_li">Покупать жд билеты дешево можно за 90 суток до отправления поезда. Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.</li>
        </ul>
    </div>
  </div>

  {/* как это работает */}
  <div className="homeBlock howItWorks">
    <div className="howItWorks__header">
      <div className="hiwHead__logo">Как это работает</div>
      {/*<div>Узнать больше</div>*/}
      <button className="hiwHead__button" type="button" onClick={() => {console.log('123')}}>Узнать больше</button>
    </div>
    
    <div className="howItWorks__body">
      <div className="hiw_item">
        <img className="hiw_item__img" src={hiw1} alt="img1"/>
        <div className="hiw_item__text">Удобный заказ на сайте</div>
      </div>
      <div className="hiw_item">
        <img className="hiw_item__img" src={hiw2} alt="img2"/>
        <div className="hiw_item__text">Нет необходимости ехать в офис</div>
      </div>
      <div className="hiw_item">
        <img className="hiw_item__img" src={hiw3} alt="img3"/>
        <div className="hiw_item__text">Огромный выбор направлений</div>
      </div>            
    </div>
  </div>

  {/* Отзывы */}
  <div className="homeBlock reviews">
    <div className='reviews_headtext'>Отзывы</div>
    <ul className="reviews_ul">
      <li className="reviewsOne">
        <img className="reviewsOne__img" src={ekValn} alt="Екатерина Вальнова"/>
        <div className="reviewsOne__content">
          <div className="reviewsOne__name">Екатерина Вальнова</div>
          <div className="reviewsOne__revtext">Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.</div>
        </div>
      </li>
      <li className="reviewsOne">
        <img className="reviewsOne__img" src={evgStryk} alt="Евгений Стрыкало"/>
        <div className="reviewsOne__content">
          <div className="reviewsOne__name">Евгений Стрыкало</div>
          <div className="reviewsOne__revtext">СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.</div>
        </div>
      </li>
    </ul>
    <div className="reviews_sliders">
      <img src={sliderButts} alt="slider buttons" />  
    </div>
    
  </div>
  
  {/* Футер */}
  <Footer/>

  </>)
}
