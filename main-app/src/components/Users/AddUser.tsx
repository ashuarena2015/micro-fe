import React, { useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Space, Select } from "antd";
import { useDispatch } from "react-redux"; 

interface AddNewUserProps {
  open: boolean;
  setOpen: Function;
}

const AddNewUser: React.FC<AddNewUserProps> = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          formData.append(key, values[key]);
        }
      }

      dispatch({
        type: "apiOnboardingRequest",
        payload: {
          url: `/api/account/create`,
          method: "POST",
          data: formData,
          onError: (getError: any) => {
            if (getError?.status === 403) {
              // navigate("/");
            }
          },
          onSuccess: (getSuccessResponse: any) => {
            console.log("getSuccessResponse?.data", getSuccessResponse?.data);
            if (getSuccessResponse?.data) {
              console.log({ getSuccessResponse });
            } else {
            }
          },
          dispatchType: "accountCreate",
        },
      });
      onClose();
    } catch (err) {
      console.log("Validation Failed:", err);
    }
  };

  return (
    <>
      <Drawer
        title="Add new user"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First name"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input placeholder="Please enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last name"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input placeholder="Please enter last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter email" }]}
              >
                <Input placeholder="Please enter email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="mobile"
                label="Mobile"
                rules={[{ required: true, message: "Please enter mobile" }]}
              >
                <Input placeholder="Please enter mobile number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Select role"
                rules={[{ required: true, message: "Please select user role" }]}
              >
                <Select
                    defaultValue="teacher"
                    // style={{ width: 120 }}
                    onChange={() => {}}
                    options={[
                        { value: 'teacher', label: 'Teacher' },
                        { value: 'student', label: 'Student' },
                        { value: 'staff', label: 'Staff' },
                        { value: 'sub-admin', label: 'Sub Admin' },
                    ]}
                    />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddNewUser;
