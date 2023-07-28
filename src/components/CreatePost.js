import React, { useState } from "react";
import axios from "axios";
import { Button, Col, Form, Input, Mentions, Row, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { TextArea } = Input;

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    const newPost = {
      title: values.title,
      body: values.description,
    };

    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      newPost
    );
    console.log("response............", response);
    //   onReset()
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       if (title.length === 0) {
  //         setIsTitleError(true);
  //         return;
  //       }

  //       if (description.length === 0) {
  //         setIsDescriptionError(true);
  //         return;
  //       }

  //       const newPost = {
  //         title,
  //         body: description,
  //       };

  //       const response = await axios.post(
  //         "https://jsonplaceholder.typicode.com/posts",
  //         newPost
  //       );
  //       console.log("response............", response);
  //       //   if (response) {
  //       //     handlePrevious();
  //       //   }

  //       // Handle success and redirect
  //     } catch (error) {
  //       // Handle error
  //     }
  //   };

  //   const handleReset = () => {
  //     setTitle("");
  //     setDescription("");
  //   };

  const handlePrevious = () => {
    navigate("/");
  };

  return (
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

export default CreatePost;
