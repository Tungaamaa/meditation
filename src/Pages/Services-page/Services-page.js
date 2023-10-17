import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";


function ServicesPage() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth)
    .then((res) =>{
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return (
    <div>
      <Header/>
      <div>
      <button onClick={handleSignOut}>Logout</button>
      </div>
      <div>
      <button>Create new post</button>
      </div>
<Modal>

<div>
<input />
<input />
<input />

<button>submit</button>
<button>close</button>

</div>
</Modal>




      <Footer/>
    </div>
  );
}

export default ServicesPage;
