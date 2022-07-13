
import { useState, useEffect   } from 'react';

// styles
import './PassengerAddForm.css';
// images
import psngrShow from '../assets/passengers/passengerShow.png';
import psngrHide from '../assets/passengers/passengerHide.png';


//
export default function PassengerAddForm(props) {
  const [formVisible, setformVisible] = useState(false);
  const [gender, setgender] = useState(['М','Ж']);
  const [genderSelected, setgenderSelected] = useState('');

  const [limitedActiv, setlimitedActiv] = useState(false);


  //
  return (<>
    <div className="psngrForm-wrapper"> {/*style={{border:'1px solid black', margin:'20px auto'}}*/}
      <div className='psngrForm__headWrapper'>
        <div className='psngrForm__head'>
          <img className='psngrForm__showhideImg' src={(!formVisible) ? psngrShow : psngrHide} 
            alt="show_hide" 
            onClick={() => { setformVisible(!formVisible) }}
          />
          <h3>PassengerAddForm</h3>
        </div>
       
        <div className='psngrForm__delete'>X</div>
      </div>
      
      <div className={'psngrForm__body ' + ( (!formVisible) ? 'psngrForm__body_hide' : '' )}>
        <div className="psngrForm__section">
          <select name="select">
            <option value="value1" selected>Взрослый</option>
            <option value="value2">Детский</option>
          </select>
        </div>

        <div className="psngrForm__section"> 
          <div>
            <label>Фамилия</label>
            <input type="text" />
          </div>

          <div>
            <label>Имя</label>
            <input type="text" />
          </div>      
        
          <div>
            <label>Отчество</label>
            <input type="text" />
          </div>
        </div>

        <div className="psngrForm__section">
          <div className='cl_21'>  {/* style={{display:'flex',flexDirection:'column',alignItems:'center'}} */}
            <label>Пол</label> 
            <div style={{display:'flex'}}>
            { gender.map( (item) => {
              return <div className={'gender ' + ( (genderSelected === item) ? 'gender_active' : '' )} 
                onClick={() => { setgenderSelected(item) }}
                >{item}</div>
            }) }
            </div>
          </div>

          <div className='cl_21'>
            <label>Дата рождения</label>
            <input className='birthDate' type="date" />
          </div>
        </div>
        
        <div className="psngrForm__section">
          <div>
            <input type="checkbox" checked={limitedActiv} onChange={() => { setlimitedActiv(!limitedActiv) }}/>
            <label>Ограниченная подвижность</label>
          </div>
        </div>

        <div className="psngrForm__section"> {/*style={{display:'flex'}}*/}
          <div>
            <label>Тип документа</label>
            <select name="select">
              <option value="value1" selected>Паспорт РФ</option>
              <option value="value2">Свидетельство о рождении</option>
            </select>
          </div>

          <div>
            <label>Серия</label>
            <input type="text" />          
          </div>

          <div>
            <label>Номер</label>
            <input type="text" />          
          </div>
        </div>
        
        <div className="psngrForm__section">
          <button>Сохранить данные</button>
        </div>
      </div>
    </div>
    </>)
}
