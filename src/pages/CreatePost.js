/* eslint-disable */
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { createPostDetails } from "../redux/actions/post";

const CreatePost = ({
  createPostDetails,
  post: {
    isCreatePostSuccess,
    isCreatePostFailed,
    createPostData,
    hasPostError,
  },
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (hasPostError && createPostData !== null) {
      window.scroll(0, 0);
      setIsLoading(false);
      enqueueSnackbar("Post has not been created.", {
        variant: "error",
      });
    }

    if (isCreatePostSuccess) {
      setIsLoading(false);
      enqueueSnackbar("Post has been created successfully.", {
        variant: "success",
      });
      onReset();
      handlePrevious();
    }
  }, [isCreatePostSuccess, isCreatePostFailed, hasPostError]);

  const onFinish = async (values) => {
    const newPost = {
      title: values.title,
      body: values.description,
    };
    setIsLoading(true);
    createPostDetails(newPost);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handlePrevious = () => {
    navigate("/");
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Form
      name="postCreate"
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 14,
        }}
      >
        <Space wrap>
          <Button onClick={handlePrevious} icon={<ArrowLeftOutlined />}>
            Back
          </Button>
        </Space>
      </Form.Item>
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input title!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input description!",
          },
        ]}
      >
        <Input.TextArea rows={6} showCount maxLength={1000} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 14,
        }}
      >
        <Space wrap>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>

          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { createPostDetails })(CreatePost);
