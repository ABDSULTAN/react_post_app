/* eslint-disable */
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { getPostDetails } from "../redux/actions/post";

const PostDetail = ({
  getPostDetails,
  post: {
    isGetPostDetailsFailed,
    isGetPostDetailsSuccess,
    getPostDetailsData,

    hasPostError,
  },
}) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostDetail();
    return () => {};
  }, [postId]);

  useEffect(() => {
    if (hasPostError && getPostDetailsData !== null) {
      window.scroll(0, 0);
      setIsLoading(false);
      enqueueSnackbar("Error fetching post detail.", {
        variant: "error",
      });
    }

    if (isGetPostDetailsSuccess) {
      setPost(getPostDetailsData);
      setIsLoading(false);
    }
  }, [isGetPostDetailsSuccess, isGetPostDetailsFailed, hasPostError]);

  const fetchPostDetail = async () => {
    getPostDetails({ postId });
    // try {
    //   const response = await axios.get(
    //     `https://jsonplaceholder.typicode.com/posts/${postId}`
    //   );
    //   setPost(response.data);
    //   setIsLoading(false);
    // } catch (error) {
    //   enqueueSnackbar("Error fetching post detail.", {
    //     variant: "error",
    //   });
    // }
  };

  const handlePrevious = () => {
    navigate("/");
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div style={{ background: "#ffffff", padding: "10px" }}>
      <Button onClick={handlePrevious} icon={<ArrowLeftOutlined />}>
        Back
      </Button>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPostDetails })(PostDetail);
