import React from 'react'
import {Link} from 'react-router-dom'
import '../Stylesheets/Home.css'

export const Home =() =>{
  return (
    <div className='home-container'>
      <div className='welcome'>
         <h1><span>Welcome</span> to farmart</h1>
         <p>your one stop shop for all the farming needs you need!</p>
      </div> 

    <div className='content'>
      <div className='bridge'>
        <p>Bridging the gap between farmers and Buyers</p>
        <p>Seamlessly in farm spaces</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  
          tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim  veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat</p>
      </div>

      <div className='image-container'>
        <img src='./images/landing-dog.jpg' alt='landing-dog' className=''/>
      </div>
  </div>

      <div className='nav-links'>
        
        <nav>
          <Link to='/signup'>Get started</Link>{'     '}
          <Link to ='/shop'>Our Services</Link>
        </nav>  
      </div>
    <div>
      <h4>Our Patners</h4>
      <p></p>
    </div>
    </div>

  )
}


