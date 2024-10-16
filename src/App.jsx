// src/App.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, deletePost } from "./features/postsSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.body) {
      dispatch(addPost(newPost));
      setNewPost({ title: "", body: "" });
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">CRUD with Redux Toolkit</h1>

      <form className="post-form" onSubmit={handleSubmit}>
        <input
          id="post-title"
          className="input-field"
          type="text"
          placeholder="Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          id="post-body"
          className="input-field"
          placeholder="Post Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        ></textarea>
        <button className="add-button" type="submit">
          Add Post
        </button>
      </form>

      {postStatus === "loading" && <div>Loading...</div>}
      {postStatus === "failed" && <div>{error}</div>}

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button
              className="delete-button"
              onClick={() => dispatch(deletePost(post.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
