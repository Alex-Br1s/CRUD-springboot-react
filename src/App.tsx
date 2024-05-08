import './App.css'
import Navbar from './components/Navbar'
import Customer from './components/Customer'
import Employee from './components/Employee'
import Supplier from './components/Supplier'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className='flex'>
      <section>
      <Navbar />
      </section>
      <Routes>
      <Route path='/customer' element={<Customer />}/>
      <Route path='/employee' element={<Employee />}/>
      <Route path='/supplier' element={<Supplier />}/>
      </Routes>
    </div>
  )
}

export default App
