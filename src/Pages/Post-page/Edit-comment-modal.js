import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

//INTERNAL IMPORT
import { commentCollection } from "../../firebase/firebase";
import "./Post-page.css";

function EditCommentModal(props) {
  const { openEditModal, selectedComment, closeEditModal } = props;
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (selectedComment) {
      setInputValue(selectedComment.comment);
    }
  }, [selectedComment]);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveButton = async (e) => {
    await updateDoc(doc(commentCollection, selectedComment.commentId), {
      ...selectedComment,
      comment: inputValue,
    })
      .then((response) => {
        console.log(response);
        closeEditModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelButton = (e) => {
    setInputValue(selectedComment.comment);
    closeEditModal();
  };

  console.log(selectedComment);

  return (
    <Modal
      className="post-page-comment-edit-modal-content"
      isOpen={openEditModal}
    >
      <div className="post-page-comment-edit-modal-container">
        <input value={inputValue} onChange={handleInput} />
        <div className="comment-edit-modal-button">
        <button onClick={handleSaveButton}>Save</button>
        <button onClick={handleCancelButton}>Cancel</button>
        </div>
        
      </div>
     
    </Modal>
  );
}

export default EditCommentModal;
