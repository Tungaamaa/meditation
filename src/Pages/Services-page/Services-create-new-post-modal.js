import React, { useState } from "react";
import Modal from "react-modal";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


//INTERNAL IMPORT
import { blogsCollection, storage } from "../../firebase/firebase";
import "./Service-page.css";

function ServicesCreateNewPostModal(props) {
  const [file, setFile] = useState();
  const { closeModal, user, openModal } = props;
  const [formValues, setFormValues] = useState({
    title: "",
    previewText: "",
    paragraph: "",
    image: "",
  });

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormValues({ ...formValues, [inputName]: inputValue });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    const storageRef = ref(storage, file.name);
    const imageUrl = await uploadBytes(storageRef, file);
    const downloadImageUrl = await getDownloadURL(storageRef);

    return downloadImageUrl;
  };

  const handleSubmitButton = async () => {
    if (
      formValues.title === "" ||
      formValues.previewText === "" ||
      formValues.paragraph === "" ||
      file === undefined
    ) {
      alert("Please complete all required fields");
    } else {
      const imageUrl = await uploadImage();
      await addDoc(blogsCollection, {
      title: formValues.title,
      previewText: formValues.previewText,
      blogParagraph: formValues.paragraph,
      blogImage: imageUrl,
      userName: user.displayName,
      userId: user.uid,
      timeStamp: serverTimestamp(),
      
    })
      .then((response) => {
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  };

  return (
    <Modal className="modal-section" isOpen={openModal} ariaHideApp={false}>
      <div className="service-page-modal-container">
        Fill out
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="enter your blog title"
        ></input>
        <textarea
          type="text"
          name="previewText"
          onChange={handleChange}
          placeholder="enter your blog text"
          rows={5}
        ></textarea>
        <textarea
          type="text"
          name="paragraph"
          onChange={handleChange}
          rows={5}
          placeholder="enter your blog text"
          className="blog-input-text"
        ></textarea>
        <input
          type="file"
          placeholder="enter your blog image"
          name="blogImage"
          onChange={handleFileChange}
        ></input>
        <div className="modal-button">
          <button onClick={handleSubmitButton}> Submit </button>
          <button onClick={props.closeModal}> close </button>
        </div>
      </div>
    </Modal>
  );
}

export default ServicesCreateNewPostModal;
