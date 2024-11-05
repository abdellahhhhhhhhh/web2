import './App.css'
import pizzaBackground from "../../assets/images/pizza.jpg"
import { Header } from '../Header'
import { Main } from '../Main'
import { Footer } from '../Footer'

function App() {

  return (
    <>
      <div className='page' style={{backgroundImage: `url(${pizzaBackground})`}}>
        <Header title="We love Pizza" version={0+1}/>
        <Main />
        <Footer />
      </div>
    </>
  )
}


export default App
