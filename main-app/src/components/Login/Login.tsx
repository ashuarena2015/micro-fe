import React, { lazy, Suspense, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, Alert } from "antd";

const ForgotPasswordForm = lazy(() => import("./ForgotPassword"));

interface AlertMsgProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [alertMsg, setAlertMsg] = useState<AlertMsgProps>({
    message: "",
    type: "info",
  });

  const [isForgotPasswordVisible, setIsForgotPasswordVisible] =
    React.useState(false);

  const onFinish = (values: any) => {
    dispatch({
      type: "apiRequest",
      payload: {
        url: `/api/account/login`,
        method: "POST",
        onSuccess: (getSuccessResponse: any) => {
          if (getSuccessResponse?.data?.token) {
            navigate("/dashboard");
          }
        },
        onError: (error: any) => {
          setAlertMsg({
            message: error?.data?.message,
            type: "error",
          });
        },
        dispatchType: "accountLogin",
        data: {
          userInfo: {
            ...values,
          },
        },
      },
    });
  };

  return (
    <Flex vertical>
      {alertMsg?.message && <Alert
        message={alertMsg.message}
        type={alertMsg.type || 'info'}
        style={{ marginBottom: '1rem' }}
      />}
      {!isForgotPasswordVisible ? (
        <Flex style={{ height: "100vh", backgroundColor: "#f0f2f5" }}>
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ minWidth: 360, textAlign: "left" }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                type="email"
                prefix={<MailOutlined />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
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
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a onClick={() => setIsForgotPasswordVisible(true)}>
                  Forgot password
                </a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <ForgotPasswordForm
            setIsForgotPasswordVisible={setIsForgotPasswordVisible}
          />
        </Suspense>
      )}
      ;
    </Flex>
  );
};

export default Login;
