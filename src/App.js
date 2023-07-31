import React from "react";
import { Route, Routes } from "react-router-dom";
import PostList from "./pages/PostList";
import PageLayout from "./PageLayout";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<PostList />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
