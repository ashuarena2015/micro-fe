import React, { useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import ImageUploader from "./ImageUploader";
import { useDispatch } from "react-redux";

const { Option } = Select;

interface EditProps {
  open: boolean;
  setOpen: Function;
  user: {
    firstName: String;
    lastName: String;
    email: String;
    mobile: Number;
    aboutSelf: String;
    profilePic: String;
  }
}

const EditProfile: React.FC<EditProps> = ({ open, setOpen, user }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [profilePicInfo, setProfilePicInfo] = useState({
    rcFile: Object,
  });
  const [profileThumbnail, setProfileThumbnail] = useState("");

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      // @ts-ignore
      formData.append("profilePicFile", profilePicInfo[0]?.originFileObj); // real File object

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          formData.append(key, values[key]);
        }
      }

      dispatch({
        type: "apiOnboardingRequest",
        payload: {
          url: `/api/account/user-update`,
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onError: (getError: any) => {
            if (getError?.status === 403) {
              // navigate("/");
            }
          },
          onSuccess: (getSuccessResponse: any) => {
            console.log("getSuccessResponse?.data", getSuccessResponse?.data);
            if (getSuccessResponse?.data?.isProfileFetched) {
              console.log({ getSuccessResponse });
            } else {
            }
          },
          dispatchType: "accountUpdate",
        },
      });
      onClose();
    } catch (err) {
      console.log("Validation Failed:", err);
    }
  };

  useEffect(() => {
    form.setFieldsValue({ profilePicName: profileThumbnail });
  }, [profileThumbnail]);

  useEffect(() => {
    if(user) {
        const { firstName, lastName, email, mobile, aboutSelf, profilePic} = user;
        console.log({profilePic});
        form.setFieldsValue({
            firstName,
            lastName,
            email,
            mobile,
            aboutSelf,
            profilePic
        })
    }
  }, [user, form])

  return (
    <>
      <Drawer
        title="Edit profile"
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
                <Input placeholder="Please enter first name" value={`${user.firstName}`} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last name"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input placeholder="Please enter last name" value={`${user.lastName}`} />
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
                <Input placeholder="Please enter email" value={`${user.email}`} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="mobile"
                label="Mobile"
                rules={[{ required: true, message: "Please enter mobile" }]}
              >
                <Input placeholder="Please enter mobile number" value={`${user.mobile || ''}`} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="aboutSelf"
                label="About me"
                rules={[
                  {
                    required: true,
                    message: "please describe yourself",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please describe yourself"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="profilePic"
                label="Profile photo"
                rules={[
                  {
                    required: true,
                    message: "please upload your photo",
                  },
                ]}
                >
                <Input hidden />
                <ImageUploader
                    setProfilePicInfo={setProfilePicInfo}
                    setProfileThumbnail={setProfileThumbnail}
                    existingImage={user?.profilePic}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default EditProfile;
