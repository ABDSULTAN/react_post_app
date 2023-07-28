import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  const fetchPostDetail = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post detail:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const handlePrevious = () => {
    navigate("/");
  };

  return (
    <div style={{ background: "#ffffff", padding: "10px" }}>
      <Button onClick={handlePrevious} icon={<ArrowLeftOutlined />}>
        Back
      </Button>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetail;
