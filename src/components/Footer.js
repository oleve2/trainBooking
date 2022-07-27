
// styles
import './Footer.css';

// images
import footTel from '../assets/footer/footer_tel.png'
import footMail from '../assets/footer/footer_mail.png'
import footSkype from '../assets/footer/footer_skype.png'
import footAddr from '../assets/footer/footer_addr.png'

import footYoutube from '../assets/footer/footer_youtube.png'
import footLinkedin from '../assets/footer/footer_linked.png';
import footGoogleplus from '../assets/footer/footer_googleplus.png';
import footFb from '../assets/footer/footer_fb.png';
import footTwitter from '../assets/footer/footer_twitter.png';

import footerUp from '../assets/footer_up.png';

//
export default function Footer() {
  return (
  <>
  {/* Футер */}
  <div className="homeBlock footer" id="contacts">
    <div className="footer_head">
      <div className="a2">
        <div className="footer_head__title">Свяжитесь с нами</div>
        <div className="footer_head__ul">
          <div className="footer_head__li">
            <img src={footTel} alt="телефон" />
            <div className="footer_head__listText">8 (800) 000 00 00</div>
          </div>
          <div className="footer_head__li">
            <img src={footMail} alt="почта" />
            <div className="footer_head__listText">inbox@mail.ru</div>
          </div>
          <div className="footer_head__li">
            <img src={footSkype} alt="скайп" />
            <div className="footer_head__listText">tu.train.tickets</div>
          </div>
          <div className="footer_head__li">
            <img src={footAddr} alt="адрес" />
            <div className="footer_head__listText">
              <div>г. Москва </div> 
              <div>ул. Московская 27-35</div>
              <div>555 555</div>
            </div>
          </div>
        </div>
      </div>
      <div className="a2 block-right">
        <div className="footer_head__title textLeft">Подписка</div>
        <form>
          <label className='footer_head__formLabel'>Будьте в курсе событий</label>
          <div style={{marginTop: '20px'}}>
            <input className='footer_head__formInput'/>
            <button className='buttSend' type="button">Отправить</button>
          </div>
          
        </form>

        <div className="footer_head__title textLeft">Подписывайтесь на нас</div>
        <ul className='footer_head__ulSocial'>
          <li className='footer_head__liSocial'>
            <img src={footYoutube} alt="" />
          </li>
          <li className='footer_head__liSocial'>
            <img src={footLinkedin} alt="" />
          </li>
          <li className='footer_head__liSocial'>
            <img src={footGoogleplus} alt="" />
          </li>
          <li className='footer_head__liSocial'>
            <img src={footFb} alt="" />
          </li>
          <li className='footer_head__liSocial'>
            <img src={footTwitter} alt="" />
          </li>
        </ul>
      </div>        
    </div>

    <div>horizontal line</div>

    <div className="footer-bottom">
      <div className="footer-bottom__logo">Лого</div>
      <img className="footer-bottom__img"
        src={footerUp} alt="Наверх" 
        onClick={() => { window.scrollTo(0,0)}} 
      />
      <div className="footer-bottom__dev">Powered by UnKnown, 2022</div>
    </div>
  </div>  
  </>
  )
}

