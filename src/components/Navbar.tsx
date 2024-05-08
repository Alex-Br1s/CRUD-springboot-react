import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav className='h-screen w-52 bg-slate-500 flex items-center justify-center'>
        <div className='flex flex-col items-center'>
            <aside>
                <Link to='/customer' className='block p-2 text-lg font-semibold text-white'>Clientes</Link>
            </aside>
            <aside>
                <Link to='/employee' className='block p-2 text-lg font-semibold text-white'>Empleado</Link>
            </aside>
            <aside>
                <Link to='/supplier' className='block p-2 text-lg font-semibold text-white'>Proveedor</Link>
            </aside>
        </div>
    </nav>
  )
}

{/* 
<div className='w-3/4 flex m-auto pt-5'>
    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <input
        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
        placeholder="Search user..." /> 
    </div>
</div> */}
export default Navbar