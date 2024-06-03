import React from 'react'
import signupBG from '../assets/signupBG.png'
import { Link } from 'react-router-dom'

 function Signup() {
  return (
    <div className='h-screen w-screen bg-cover bg-center flex justify-center items-center' style={{ backgroundImage: `url(${signupBG})`,}}>
      <div className='flex flex-col justify-around items-center bg-gradient-to-b from-[#396B91] to-[#7AB1DB]
      w-1/4 h-4/5 p-10 rounded-md transform scale-90"'>
        <h1 className='text-4xl font-bold text-white'>Sign Up</h1>

        <div>
          <form action="">
            <div><input className='m-2 p-2' type="text" placeholder='Enter your username' /></div>
            <div><input className='m-2 p-2' type="text" placeholder='Enter your email' /></div>
            <div><input className='m-2 p-2' type="text" placeholder='Enter your password' /></div>
            <div><input className='m-2 p-2' type="text" placeholder='Confirm your password' /></div>
          </form>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <button className='font-sans bg-black text-white border-none px-4 py-2 m-2'>Signup</button>
          <Link className='underline' to="/Login">Already a user? Login</Link>
        </div>
      </div>
    </div>
  )
}


export default Signup