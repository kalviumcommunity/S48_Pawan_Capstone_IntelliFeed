import React from 'react'
import LandingpageBG from '../assets/landingpageBG.png'
import Gicon from '../assets/Gicon.png'

export default function Landingpage() {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-cover font-serif' style={{ backgroundImage: `url(${LandingpageBG})`,}}>
      <div className='flex flex-col justify-center items-center text-center'>
      <h1 className='text-8xl leading-none m-0 text-white'> <span className='text-9xl'>I</span>NTELLI<span className='text-9xl'>F</span>EED</h1>
      <h2 className='text-2xl text-blue-200 m-1'>Cut through the Noise and get the News you want</h2>
      <h3 className='text-xl text-blue-200 m-2'>
      IntelliFeed is your one-stop shop for staying informed in today's fast-paced world.
      <br />  Our intelligent platform curates a personalized news feed that delivers the stories that matter most to you.  
      <br />No more information overload!
      </h3>
      <div className='flex justify-center items-center'>
      <button className='font-sans bg-black text-white border-none px-4 py-2 m-2'> Sign-up </button>
      <button className='font-sans bg-blue-200 text-black border-none px-4 py-2 m-2'> Login </button>
      <img className='w-50 h-10' src={Gicon} alt="" />
      </div>
      </div>
    </div>
  )
}
