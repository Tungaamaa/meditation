import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

//INTERNAL IMPORT
import { blogsCollection } from "../../firebase/firebase";

function EditBlogModal(props) {
  const { openEditBlogModal, selectedBlog, closeEditBlogModal } = props;
  const [inputValue, setInputValue] = useState({
    title: "",
    previewText: "",
    blogParagraph: "",
  });

  useEffect(() => {
    if (selectedBlog) {
      setInputValue({
        title: selectedBlog.title,
        previewText: selectedBlog.previewText,
        blogParagraph: selectedBlog.blogParagraph,
      });
    }
  }, [selectedBlog]);

  const handleInput = (e) => {
    const inputName = e.target.name;
    const value = e.target.value;
    setInputValue({ ...inputValue, [inputName]: value });
  };

  const handleSaveButton = async (e) => {
    await updateDoc(doc(blogsCollection, selectedBlog.blogId), {
      ...selectedBlog,
      title: inputValue.title,
      previewText: inputValue.previewText,
      blogParagraph: inputValue.blogParagraph,
    })
      .then((response) => {
        console.log(response);
        closeEditBlogModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelButton = (e) => {
    setInputValue(selectedBlog);
    closeEditBlogModal();
  };



  return (
    <Modal
      className="modal-section"
      isOpen={openEditBlogModal}
      ariaHideApp={false}
    >
      <div className="service-page-modal-container">
        Fill out
        <input
          type="text"
          name="title"
          value={inputValue.title}
          onChange={handleInput}
          placeholder="enter your blog title"
        ></input>
        <textarea
          type="text"
          name="previewText"
          value={inputValue.previewText}
          onChange={handleInput}
          placeholder="enter your blog text"
          rows={5}
        ></textarea>
        <textarea
          type="text"
          name="blogParagraph"
          value={inputValue.blogParagraph}
          onChange={handleInput}
          rows={5}
          placeholder="enter your blog text"
          className="blog-input-text"
        ></textarea>
        <div className="modal-button">
          <button onClick={handleSaveButton}>Save</button>
          <button onClick={handleCancelButton}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

export default EditBlogModal;
