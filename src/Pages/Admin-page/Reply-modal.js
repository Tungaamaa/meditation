import React from 'react'
import Modal from "react-modal";
// import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import "./Admin-page.css"

function ReplyModal(props) {

    const {openModal, closeModal} = props;

    const handleCancelButton = (e) => {
        closeModal();
    };



  return (
    <Modal className="admin-page-reply-modal-content" isOpen={openModal}>
    <div className='admin-page-reply-modal-container'>
  
  <a href="https://mail.google.com/">
    <div>
      <MdEmail />
    </div>
  </a>
  <button onClick={handleCancelButton}>Cancel</button>
    </div>
    
    </Modal>
  )
}

export default ReplyModal;

// <a href="https://facebook.com/">
// <div>
//   <FaFacebook />
// </div>
// </a>
// <a href="https://twitter.com/">
// <div>
//   <FaTwitter />
// </div>
// </a>
// <a href="https://www.linkedin.com/">
// <div>
//   <FaLinkedin />
// </div>
// </a>
// <a href="https://instagram.com/">
// <div>
//   <FaInstagram />
// </div>
// </a>