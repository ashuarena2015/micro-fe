import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex, Radio, Alert, Typography, GetProps } from "antd";

type OTPProps = GetProps<typeof Input.OTP>;

const Register: React.FC = () => {
  const dispatch = useDispatch();

  const [isCreating, setIsCreating] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
	const [enteredOtp, setEnteredOtp] = useState<string>("");
	const [accountCreated, setAccountCreated] = useState(false);
	const [createdUserInfo, setCreatedUserInfo] = useState<any>(null);

	const onOtpChange: OTPProps['onChange'] = (otp) => {
		setEnteredOtp(otp)
  };

  const sharedProps: OTPProps = {
    onChange: onOtpChange,
  }

  const onFinish = async (values: any) => {
    setIsCreating(true);
    dispatch({
      type: "apiRequest",
      payload: {
        url: !isOtpSent ? `/api/account/create` : `/api/account/verify`,
        method: "POST",
        onError: "GLOBAL_MESSAGE",
        onSuccess: (getSuccessResponse: any) => {
					setIsCreating(false);
          if (getSuccessResponse?.data?.isLoginOtpSent) {
            setIsOtpSent(true);
          }
					if(getSuccessResponse?.data?.token) {
						setIsOtpSent(false);
						setAccountCreated(true);
						setCreatedUserInfo(getSuccessResponse?.data?.userInfo);
					}
        },
        dispatchType: !isOtpSent ? "accountCreation" : "accountVerification",
        data: {
          userInfo: {
            ...values,
						...isOtpSent && enteredOtp ? { otp: enteredOtp } : null,
          },
        },
      },
    });
  };

  return (
      <Flex
        style={{ height: "100vh", backgroundColor: "#f0f2f5" }}
      >
        <Flex vertical style={{ maxWidth: 400, width: "100%" }}>
          {accountCreated && <Alert
            message={`Welcome, ${createdUserInfo?.firstName} ${createdUserInfo?.lastName}!`}
            description="Your account has been created successfully. You will be redirected to the login page shortly."
            type="info"
            showIcon
            style={{ marginBottom: 16, textAlign: "left" }}
          />}
          <Form
            name="register"
            initialValues={{ remember: true, gender: "male" }}
            style={{ minWidth: 360, textAlign: "left" }}
            onFinish={onFinish}
            layout="vertical"
          >
						<div style={{ display: "flex", gap: "16px" }}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="First name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Last name" />
              </Form.Item>
            </div>
            <Form.Item
							label="Gender"
							name="gender"
							required
							style={{ display: 'flex' }}
						>
              <Radio.Group
                name="gender"
                defaultValue={'male'}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                type="email"
                prefix={<MailOutlined />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
						{isOtpSent && <>
								<Form.Item label="OTP" name="otp">
									<Input.OTP length={6} {...sharedProps} />
									<Typography.Paragraph type="secondary" style={{ margin: '0.5rem 0 0' }}>
        						6 digit otp sent on your email
      						</Typography.Paragraph>
								</Form.Item>
						</>}
            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={isCreating}
                disabled={isCreating}
              >
                {isOtpSent ? 'OTP verify' : 'Register'}
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
  );
};

export default Register;
