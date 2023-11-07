import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {FaEdit,} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
//INTERNAL IMPORT
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { blogsCollection } from "../../firebase/firebase";
import ServicesCreateNewPostModal from "./Services-create-new-post-modal";
import EditBlogModal from "./Edit-blog-modal";
import "./Service-page.css";

function ServicesPage(props) {
  const { user } = props;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditBlogModal, setOpenEditBlogModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState();
  const [searchField, setSearchField] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      onSnapshot(blogsCollection, (collection) => {
        const firebaseDocData = collection.docs.map((doc) => {
          const blogId = doc.id;
          const blogData = doc.data();
          blogData.blogId = blogId;
          return blogData;
        });
        setData(firebaseDocData);
        setFilteredData(firebaseDocData);
      });
      setLoading(false);
    };

    return () => getData();
  }, []);

  const handleCreateNewPostButton = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    toast.success("Blog post submitted successfully!");
    setOpenModal(false);
  };

  const handlePostClick = (id) => {
    navigate(`/services/${id}`);
  };

  const handleDeleteBlog = async (blogId) => {
    await deleteDoc(doc(blogsCollection, blogId))
      .then((response) => {
        toast.success("successfully removed  the blog!");
      })
      .catch((error) => console.log(error));
  };

  const handleOpenEditBlogModal = (blog) => {
    setSelectedBlog(blog);
    setOpenEditBlogModal(true);
  };

  const closeEditBlogModal = () => {
    setOpenEditBlogModal(false);
  };

  const handleSearch = (e) => {
    setSearchField(e.target.value);
  };

  useEffect(() => {
    const searchData = data.filter((value) =>
      value.title.toLowerCase().includes(searchField.toLowerCase())
    );
    setFilteredData(searchData);
  }, [searchField]);

  return (
    <div>
      <Header />
      <section className="service-page-content">
        <div className="search-bar">
          <input
            type="search"
            placeholder="Search"
            className="search-input"
            onChange={handleSearch}
          />
        </div>

        <div className="service-page-post-container">
          <div className="create-new-post-container">
            <button
              className="create-new-post-button"
              onClick={handleCreateNewPostButton}
            >
              Create new post
            </button>
          </div>
          {loading && <div>loading data ... </div>}
          {!loading && data.length === 0 && <div>there is no blogs</div>}
          {!loading && data.length > 0 && (
            <div className="blog-content">
              {filteredData.map((blog, index) => {
                return (
                  <div className="blogs-container">
                    <div
                      className="blog-container"
                      key={index}
                      onClick={(e) => {
                        handlePostClick(blog.blogId);
                      }}
                    >
                      <div className="blog-title">{blog.title}</div>
                      <img
                        className="blog-image"
                        alt="blog-image"
                        src={blog.blogImage}
                      />

                      <div className="blog-text">{blog.previewText} </div>
                    </div>
                    {blog.userId === user.uid && (
                      <div className="services-page-buttons">
                        <button 
                        className="services-page-edit-button"
                          onClick={(e) => {
                            handleOpenEditBlogModal(blog);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                        className="services-page-delete-button"
                          onClick={(e) => {
                            handleDeleteBlog(blog.blogId);
                          }}
                        >
                          <MdDelete/>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <ServicesCreateNewPostModal
          user={props.user}
          openModal={openModal}
          closeModal={closeModal}
        />
        <EditBlogModal
          openEditBlogModal={openEditBlogModal}
          selectedBlog={selectedBlog}
          closeEditBlogModal={closeEditBlogModal}
        />
      </section>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default ServicesPage;
