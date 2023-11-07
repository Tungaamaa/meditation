import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";

//INTERNAL IMPORT
import { commentCollection } from "../../firebase/firebase";
import EditCommentModal from "./Edit-comment-modal";

function Comment(props) {
  const { data, userId } = props;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState();

  const handleDeleteComment = async (commnentId) => {
    await deleteDoc(doc(commentCollection, commnentId))
      .then((response) => {
        console.log("successfully removed  the comment");
      })
      .catch((error) => console.log(error));
  };

  const handleOpenEditModal = (comment) => {
    setSelectedComment(comment);
    setOpenEditModal(true);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <div>
      {data.map((comment, index) => {
        return (
          <div className="post-page-comment-container" key={index}>
            {comment.comment}
            {comment.userId === userId && (
              <div>
                <div className="post-page-comment-username">{comment.userName}</div>
                <button
                  onClick={(e) => {
                    handleOpenEditModal(comment);
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    handleDeleteComment(comment.commentId);
                  }}
                >
                Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
      <EditCommentModal
        openEditModal={openEditModal}
        selectedComment={selectedComment}
        closeEditModal={closeEditModal}
      />
    </div>
  );
}

export default Comment;
