import React from 'react'

function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-between justify-items-center px-9'>
      <img src='/logo.svg'/>
      <div>
        <button>Sign In</button>
      </div>
    </div>
  )
}

export default Header
