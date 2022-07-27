
import { useState, useEffect } from 'react';

// styles
import './PassengerAddForm.css';
// images
import psngrShow from '../assets/passengers/passengerShow.png';
import psngrHide from '../assets/passengers/passengerHide.png';


//
export default function PassengerAddForm(props) {
  const [formVisible, setformVisible] = useState(false);

  // ---------------------------------
  // 01 ticketType
  const ticketTypeList = ['', 'Взрослый','Детский'];
  const [ticketTypeSelected, setticketTypeSelected] = useState( (props.p.ticketType !== undefined) ? props.p.ticketType : '' );
  
  // 02 FIO
  const [firstName, setfirstName]   = useState(props.p.firstName);
  const [secondName, setsecondName] = useState(props.p.secondName);
  const [thirdName, setthirdName]   = useState(props.p.thirdName);
  
  // 03-1 gender
  const gender = ['М','Ж'];
  const [genderSelected, setgenderSelected] = useState( (props.p.gender !== undefined) ? props.p.gender : 'М');

  // 03-2 date birth
  const [birthDate, setbirthDate] = useState(props.p.birthDate);

  // 03-3 limited activity
  const [limitedActiv, setlimitedActiv] = useState(props.p.limitedActiv);

  // 04 document type, series, number
  const docTypeList = ['', 'Паспорт РФ','Свидетельство о рождении'];
  const [docTypeSelected, setdocTypeSelected] = useState( (props.p.docType !== undefined) ? props.p.docType : '' );
  const [docSeries, setdocSeries]   = useState(props.p.docSeries);
  const [docNumber, setddocNumber]  = useState(props.p.docNumber);

  // ----------------------------------
  //
  const changeTickType = (e) => {
    console.log(e.target.value);
    setticketTypeSelected(e.target.value);
  }

  const doSaveChanges = () => {
    // get form data in object
    let obj = {
      id: props.p.id,
      //
      ticketType: ticketTypeSelected,
      firstName: firstName,
      secondName: secondName,
      thirdName: thirdName,
      // 
      gender: genderSelected,
      birthDate: birthDate,
      limitedActiv: limitedActiv,
      //
      docType: docTypeSelected,
      docSeries: docSeries,
      docNumber: docNumber,
    }
    console.log('obj=', obj);

    // update store in page-passengers
    props.handleUpdatePassenger(obj);
  }

  //
  useEffect( () => {
    setfirstName(firstName);
    setsecondName(secondName);
    setthirdName(thirdName);
    setbirthDate(birthDate);
    setlimitedActiv(limitedActiv);
    setdocTypeSelected(docTypeSelected);
    setdocSeries(docSeries);
    setddocNumber(docNumber);
  },[firstName, secondName, thirdName, birthDate, limitedActiv, docTypeSelected, docSeries, docNumber])


  //
  return (<>
    <div className="psngrForm-wrapper">
      <div className='psngrForm__headWrapper'>
        <div className='psngrForm__head'>
          <img className='psngrForm__showhideImg' src={(!formVisible) ? psngrShow : psngrHide} 
            alt="show_hide" 
            onClick={() => { setformVisible(!formVisible) }}
          />
          <h3>Пассажир {props.p.id}</h3>
        </div>
       
        <div className='psngrForm__delete' 
          onClick={() => {props.handleRemovePassenger(props.p.id)} }
        >X</div>
      </div>
      
      <div className={'psngrForm__body ' + ( (!formVisible) ? 'psngrForm__body_hide' : '' )}>
        <div className="psngrForm__section">
          <select defaultValue={ticketTypeSelected} onChange={changeTickType}>
            { ticketTypeList.map( (item) => {
              return <option key={item} value={item}>{item}</option>
            }) }
          </select>
        </div>

        <div className="psngrForm__section"> 
          <div className='vertTab'>
            <label>Фамилия {firstName}</label>
            <input type="text" value={firstName} onChange={(e) => { setfirstName(e.target.value) }}/>
          </div>

          <div className='vertTab'>
            <label>Имя {secondName}</label>
            <input type="text" value={secondName} onChange={(e) => { setsecondName(e.target.value) }}/>
          </div>      
        
          <div className='vertTab'>
            <label>Отчество {thirdName}</label>
            <input type="text" value={thirdName} onChange={(e) => { setthirdName(e.target.value) }}/>
          </div>
        </div>

        <div className="psngrForm__section">
          <div className='gender-birth-wrapper'>
            <label>Пол</label> 
            <div style={{display:'flex'}}>
            { gender.map( (item) => {
              return <div key={item} className={'gender ' + ( (genderSelected === item) ? 'gender_active' : '' )} 
                onClick={() => { setgenderSelected(item) }}
                >{item}</div>
            }) }
            </div>
          </div>

          <div className='gender-birth-wrapper'>
            <label>Дата рождения</label>
            <input className='birthDate' type="date" 
              value={birthDate} onChange={(e) => { setbirthDate(e.target.value) }}
            />
          </div>
        </div>
        
        <div className="psngrForm__section">
          <div>
            <input type="checkbox" checked={limitedActiv} 
              value={limitedActiv} onChange={() => { setlimitedActiv(!limitedActiv) }}
            />
            <label>Ограниченная подвижность</label>
          </div>
        </div>

        <div className="psngrForm__section"> {/*style={{display:'flex'}}*/}
          <div className='vertTab'>
            <label>Тип документа</label>
            <select name="select" value={docTypeSelected} onChange={(e) => { setdocTypeSelected(e.target.value) }}>
            { docTypeList.map( (item) => {
              return <option key={item} value={item}>{item}</option>
            }) }              
            </select>
          </div>
          
          {/* тип документа */}
          {
          (docTypeSelected === 'Паспорт РФ') && 
          <>
          <div className='vertTab'>
            <label>Серия</label>
            <input type="text" value={docSeries} onChange={(e) => { setdocSeries(e.target.value) }}/>          
          </div>
          <div className='vertTab'>
            <label>Номер</label>
            <input type="text" value={docNumber} onChange={(e) => { setddocNumber(e.target.value) }}/>          
          </div>          
          </>
          }

          {
          (docTypeSelected === 'Свидетельство о рождении') && 
          <>
          <div className='vertTab'>
            <label>Номер</label>
            <input type="text" value={docNumber} onChange={(e) => { setddocNumber(e.target.value) }}/>          
          </div>          
          </>
          }

        </div>
        
        <div className="psngrForm__section">
          <button onClick={doSaveChanges}>Сохранить данные</button>
        </div>
      </div>
    </div>
    </>)
}
