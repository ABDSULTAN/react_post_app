/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchPosts();
  }, [start]);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "body",
      render: () => (
        <>
          <EyeOutlined style={{ cursor: "pointer" }} />
        </>
      ),
    },
  ];

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
      );
      if (response.data.length > 0) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleNext = () => {
    setStart(start + limit);
  };

  const handlePrevious = () => {
    if (start >= limit) {
      setStart(start - limit);
    }
  };

  const onCreatePost = () => {
    navigate("create-post");
  };

  return (
    <div style={{ background: "#ffffff", padding: "10px" }}>
      <div style={{ textAlign: "end", marginBottom: "10px" }}>
        <Button icon={<EditOutlined />} onClick={onCreatePost}>
          Create Post
        </Button>
      </div>

      <Table
        rowKey="id"
        bordered
        columns={columns}
        dataSource={posts}
        pagination={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              navigate(`post/${record.id}`);
            },
          };
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Button type="primary" onClick={handlePrevious}>
          <ArrowLeftOutlined />
        </Button>
        <Button type="primary" onClick={handleNext}>
          <ArrowRightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default PostList;
