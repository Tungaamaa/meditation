import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
//INTERNAL IMPORT
import { subscribeCollection } from "../../firebase/firebase";
import Header from "../../Components/Header/Header";
import "./Admin-page.css";
import ReplyModal from "./Reply-modal";

function AdminPage(props) {
  const { user } = props;
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const isAdmin = user && user.email === "admin123@gmail.com";

  useEffect(() => {
    const getSubscribeData = async () => {
      onSnapshot(subscribeCollection, (collection) => {
        const firebaseSubscribeData = collection.docs.map((doc) => {
          const subscribeId = doc.id;
          const subscribeData = doc.data();
          subscribeData.subscribeId = subscribeId;
          return subscribeData;
        });
        setData(firebaseSubscribeData);
      });
    };
    return () => getSubscribeData();
  }, []);

  const handleDeleteContact = async (subscribeId) => {
    await deleteDoc(doc(subscribeCollection, subscribeId))
      .then((response) => {
        console.log("successfully removed  the message !");
      })
      .catch((error) => console.log(error));
  };

  const handleReplyUser = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Header />
      <div className="admin-page-content">
        {isAdmin &&
          data.map((subscribe) => {
            return (
              <div className="admin-page-container">
                <div className="subscriber-name">{subscribe.name}</div>
                <div className="subscriber-email">{subscribe.email}</div>
                <div className="subscriber-message">{subscribe.message}</div>
                <div>
                <div>
                <input type="checkbox"/>
                <span>Replied</span>
                </div>
                  <button onClick={handleReplyUser}>Reply</button>
                  <button
                    onClick={() => {
                      handleDeleteContact(subscribe.subscribeId);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        {!isAdmin && <div>you don't have this permission</div>}
      </div>
      <ReplyModal openModal={openModal} closeModal={closeModal} />
    </div>
  );
}

export default AdminPage;
