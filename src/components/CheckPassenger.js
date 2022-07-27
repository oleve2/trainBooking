
// style
import './CheckPassenger.css';

// images
import passengerPhoto from '../assets/checkout/passengerPhoto.png';

//
export default function CheckPassenger(props) {
  const mapGender = (val) => {
    if (val === 'М') { return 'мужской' }
    if (val === 'Ж') { return 'женский' }
  }

  //
  return (<div className='tmp-cp-0-0'>
    <div className="tmp-cp-0-1 tmp-cp-0-1-left">
      <img src={passengerPhoto} alt="картинка" />
      <div>{props.p.ticketType}</div>
    </div>

    <div className="tmp-cp-0-1 tmp-cp-0-1-right">
      <div>{props.p.firstName} {props.p.secondName} {props.p.thirdName}</div>
      <div>Пол {mapGender(props.p.gender)}</div>
      <div>Дата рождения {props.p.birthDate}</div>
      <div>{props.p.docType} {props.p.docSeries} {props.p.docNumber}</div>
    </div>
  </div>)
}
