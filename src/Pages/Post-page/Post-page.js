import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocs, onSnapshot } from "firebase/firestore";
import { addDoc } from "firebase/firestore";

//INTERNAL IMPORT
import { blogsCollection, commentCollection } from "../../firebase/firebase";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Comment from "./Comment";
import "./Post-page.css";

function PostPage(props) {
  const { user } = props;
  const { id } = useParams();
  const selectedBlogId = id;

  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  console.log(blogData);
  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const getBlogPageData = async () => {
      setLoading(true);
      const blogs = await getDocs(blogsCollection);
      const blogsData = blogs.docs.map((doc) => {
        const blogId = doc.id;
        const blogData = doc.data();
        blogData.blogId = blogId;
        return blogData;
      });
      const selectedBlog = blogsData.find((blog) => {
        return blog.blogId === selectedBlogId;
      });
      setBlogData(selectedBlog);
      onSnapshot(commentCollection, (collection) => {
        const firebaseCommentData = collection.docs.map((doc) => {
          const commentId = doc.id;
          const commentData = doc.data();
          commentData.commentId = commentId;
          return commentData;
        });
        const blogComments = firebaseCommentData.filter((comment) => {
          return comment.blogId === selectedBlog.blogId;
        });
        setCommentsData(blogComments);
      });

      setLoading(false);
    };

     getBlogPageData();
  }, [selectedBlogId]);

  const handleCommentButton = async () => {
    await addDoc(commentCollection, {
      comment: inputValue,
      blogId: blogData.blogId,
      userId: user.uid,
      userName: user.displayName,
    })
      .then((response) => {
        setInputValue("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // {new Date(blogData.timeStamp * 26.62).toDateString()}
  return (
    <div>
      <Header />
      {loading && <div>loading . . . </div>}
      {!loading && blogData === undefined && <div>Blog not Found</div>}
      {!loading && blogData !== undefined && (
        <div className="post-page-content">
          <div className="post-page-main">
            <div className="post-page-blog-poster">
              <span>
                Posted by:{blogData.userName} 
              </span>
              <span></span>
            </div>
            <div className="post-page-container">
              <div className="post-page-blog-content">
                <div className="post-page-blog-title">{blogData.title}</div>
                <div className="post-page-blog-text">
                  {blogData.blogParagraph}
                </div>

                <div className="comment-bar">
                  <input
                    type="text"
                    placeholder="leave your comment"
                    onChange={handleInputValue}
                    value={inputValue}
                    className="comment-input"
                  ></input>
                  <button onClick={handleCommentButton}>Comment</button>
                </div>
                <div>
                  <Comment data={commentsData} userId={user.uid} />
                </div>
              </div>

              <div className="post-page-comment-content">
                <img
                  className="post-page-blog-image"
                  alt="blog-image"
                  src={blogData.blogImage}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default PostPage;
