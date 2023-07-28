import React from "react";
import { Route, Routes } from "react-router-dom";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import PostDetail from "./components/PostDetail";
import PageLayout from "./PageLayout";

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
