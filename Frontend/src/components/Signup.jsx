import React from 'react'
import './components.css'
import line from '../assets/lb.png'
import i2 from '../assets/if.png'
import sgbox from '../assets/sgbox.png'

export default function Signup() {
  return (
    <div id="signupcontainer">
      <img id="lb" src={line} alt="" />
      <img id="sgbox" src={sgbox} alt="" />
      <img id="if" src={i2} alt="" />
    </div>
  )
}
