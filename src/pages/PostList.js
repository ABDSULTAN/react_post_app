/* eslint-disable */
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getAllPost } from "../redux/actions/post";

const PostList = ({
  getAllPost,
  post: {
    isGetPostSuccess,
    isGetPostFailed,
    getPostData,

    hasPostError,
  },
}) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);

  const limit = 10;

  useEffect(() => {
    fetchPosts();
  }, [start]);

  useEffect(() => {
    if (hasPostError && getPostData !== null) {
      window.scroll(0, 0);
      setIsLoading(false);
      enqueueSnackbar("Error fetching posts.", {
        variant: "error",
      });
    }

    if (isGetPostSuccess) {
      setPosts(getPostData);
      setIsLoading(false);
    }
  }, [isGetPostSuccess, isGetPostFailed, hasPostError]);

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
    setIsLoading(true);

    const body = {
      start,
      limit,
    };
    getAllPost(body);
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

  return isLoading ? (
    <Loader />
  ) : (
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

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getAllPost })(PostList);
