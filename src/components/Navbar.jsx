import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-700 text-white py-2 px-5'>
        <div className="logo">
            <span className="font-bold text-xl mx-9">
                iTask
            </span>
        </div>
        <ul className="flex gap-8">
            <li className='cursor-pointer hover:font-bold transition-all duration-3'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-3'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
