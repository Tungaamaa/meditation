import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <div>
    <div className='footer-top'>
    <div className='footer-items'>
    <a href='https://facebook.com/'>
    <div className='footer-item' ><FaFacebook/></div>
    </a>
    <a href='https://twitter.com/'>
    <div className='footer-item'><FaTwitter/></div>
    </a>    
    <a href='https://www.linkedin.com/'>
    <div className='footer-item'><FaLinkedin/></div>
    </a>
    <a href='https://instagram.com/'>
    <div className='footer-item'><FaInstagram/></div>
    </a>
    </div>
    </div>

    <div className='footer'>
  

    <div >
    <h1>Subscribe to our newsletter</h1>
    <input className='subscribe-input' placeholder='Email address'/> 
    <div className='footer-text'>
    Lynnwood Planning and Development Corporation | 3333 Semple Street, Pittsburgh, WA 15213
    
    </div>
    </div>
    </div>
    </div>
  )
}

export default Footer;