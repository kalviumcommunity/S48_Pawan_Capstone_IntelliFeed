import React from 'react'
import logo from '../assets/logo.png'
import './components.css'
import line from '../assets/Group89.png'
import IF from '../assets/if.png'
import sgbox from '../assets/sgbox.png'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className="flex"id="signupcontainer">
      <img id="lb" class="LR" src={line} alt="" />
      <div className='flex sgbox'>
        <div className='container logocontainer flex'>
          <img id="logo" src={logo} alt="" />
        </div>
        <div className='container flex'>
          <form action="" className='flex form'>
            <input type="text" placeholder='Enter your username' />
            <input type="text" placeholder='Enter your email-id' />
            <input type="text" placeholder='Enter your password' />
            <input type="text" placeholder='confirm your password' />
            <button> Sign-up </button>
            {/* <Link to="">Already a user? Login</Link> */}
          </form>
        </div>
      </div>
      <img className="LR" id="if" src={IF} alt="" />
    </div>
  )
}
