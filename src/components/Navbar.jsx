import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='w-full bg-amber-700 p-4 mb-6'>
      <div className='max-w-6xl mx-auto flex flex-row gap-6 items-center'>
        <h1 className='text-xl font-bold text-white mr-auto'>PasteApp</h1>
        <NavLink 
          to="/" 
          className={({isActive}) => 
            `px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive ? 'bg-white text-amber-700' : 'text-white hover:bg-amber-800'
            }`
          }>
          Home
        </NavLink>
        <NavLink 
          to="/pastes"
          className={({isActive}) => 
            `px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive ? 'bg-white text-amber-700' : 'text-white hover:bg-amber-800'
            }`
          }>
          Pastes
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar