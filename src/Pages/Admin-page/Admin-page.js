import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";

//INTERNAL IMPORT
import { subscribeCollection } from "../../firebase/firebase";
import Header from "../../Components/Header/Header";
import "./Admin-page.css";
import ReplyModal from "./Reply-modal";

const { siderHeader, Sider } = Layout;

function AdminPage(props) {
  const { user } = props;
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
    getSubscribeData();
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
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Users",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Messages",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "Subscripers",
              },
            ]}
          />
        </Sider>
        <Layout>
          <siderHeader className="sider-header">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="admin-page-collapsed"
            />
          </siderHeader>

          <div className="admin-page-content">
            {isAdmin &&
              data.map((subscribe) => {
                return (
                  <div className="admin-page-container">
                    <div className="subscriber-name">{subscribe.name}</div>
                    <div className="subscriber-email">{subscribe.email}</div>
                    <div className="subscriber-message">
                      {subscribe.message}
                    </div>
                    <div>
                      <div>
                        <input type="checkbox" />
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
        </Layout>
      </Layout>
    </div>
  );
}

export default AdminPage;
