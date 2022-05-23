import Navigation from "../components/Navigation"

import RangeSlider from "../components/ui/RangeSlider"
import Switcher from "../components/ui/Switcher"

import TudaObratno from "../components/TudaObratno"

import NavigationTicket from "../components/NavigationTicket"

export default function PagePayment(props) {
  return (<>
    <Navigation/>
    <hr/>  
    PagePayment
    <RangeSlider min={0} max={200} rangeName="Стоимость" rangeWidth='300px'/>
    <Switcher />
    <hr />
    <TudaObratno title='Туда и Обратно'/>
    <hr />
    <NavigationTicket />
    </>
  )
}
