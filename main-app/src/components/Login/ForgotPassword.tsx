import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Flex, Form, Input, Button, Alert, Typography, GetProps } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

interface ForgotPasswordProps {
  setIsForgotPasswordVisible: (visible: boolean) => void;
}

type OTPProps = GetProps<typeof Input.OTP>;

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  setIsForgotPasswordVisible,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isResetPassword, setIsResetPassword] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [isNewPassword, setIsNewPassword] = React.useState(false);
	const [userEmail, setUserEmail] = React.useState("");
	const [isNewPasswordSaved, setIsNewPasswordSaved] = React.useState(false);

  const dispatch = useDispatch();

	useEffect(() => {
		if(isNewPasswordSaved) {
			setTimeout(() => {
				setIsResetPassword(false);
				setIsNewPassword(false);
				setIsForgotPasswordVisible(false);
			}, 3000);
		}
	}, [isNewPasswordSaved]);

  const onForgotPasswordSave = async (values: any) => {
    setIsLoading(true);
		setUserEmail(values.email);
    await dispatch({
      type: "apiRequest",
      payload: {
        url: `/api/account/forgot-password`,
        method: "POST",
        onError: "GLOBAL_MESSAGE",
        onSuccess: (getSuccessResponse: any) => {
          setIsResetPassword(getSuccessResponse?.data?.isForgotPasswordOtp);
          setAlertMessage(
            getSuccessResponse?.data?.message ||
              "Please check your email for the OTP."
          );
        },
        dispatchType: "accountForgotPassword",
        data: {
          email: values.email,
        },
      },
    });
    setIsLoading(false);
    // You might want to dispatch an action or make an API call
  };

  const onResetPasswordVerify = async (otp: number) => {
    setIsLoading(true);
    await dispatch({
      type: "apiRequest",
      payload: {
        url: `/api/account/verify`,
        method: "POST",
        onError: "GLOBAL_MESSAGE",
        onSuccess: (getSuccessResponse: any) => {
          setAlertMessage(
            getSuccessResponse?.data?.message || "Password reset successfully."
          );
          setIsNewPassword(true);
        },
        dispatchType: "accountResetPassword",
        data: {
					userInfo: {
						isResetPassword: true,
          	resetPasswordOtp: otp,
					}
        },
      },
    });
    setIsLoading(false);
  };

  const onOtpChange: OTPProps["onChange"] = (otp) => {
    onResetPasswordVerify(Number(otp));
  };

  const sharedProps: OTPProps = {
    onChange: onOtpChange,
  };

	const onNewPasswordSave = async (values: any) => {
		setIsLoading(true);
    await dispatch({
      type: "apiRequest",
      payload: {
        url: `/api/account/reset-password`,
        method: "POST",
        onError: "GLOBAL_MESSAGE",
        onSuccess: (getSuccessResponse: any) => {
          setAlertMessage(
            getSuccessResponse?.data?.message || "Please login with your new credential."
          );
          setIsNewPassword(false);
					setIsNewPasswordSaved(true);
        },
        dispatchType: "accountResetPassword",
        data: {
					userInfo: {
						password: values?.new_password,
						email: userEmail,
					}
        },
      },
    });
    setIsLoading(false);
	}

  const handleClose = () => {
    setAlertMessage("");
    setIsResetPassword(false);
  };

  return (
    <>
      {alertMessage && (
        <Alert
          message={alertMessage}
          type={isResetPassword ? "success" : "info"}
          style={{ marginBottom: "1rem", width: "100%" }}
          closable
          afterClose={handleClose}
        />
      )}
			{!isNewPasswordSaved ? (
				<Flex style={{ height: "100vh", backgroundColor: "#f0f2f5" }}>
        {!isResetPassword ? (
          <div style={{ width: "100%" }}>
            <h5>Forgot Password</h5>
            <Form
              name="forgot-password"
              initialValues={{ remember: true }}
              style={{ minWidth: 360, textAlign: "left" }}
              onFinish={onForgotPasswordSave}
              layout="vertical"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  type="email"
                  prefix={<MailOutlined />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Send Email
                </Button>
                <a
                  onClick={() => setIsForgotPasswordVisible(false)}
                  style={{
                    textAlign: "center",
                    marginTop: "1rem",
                    display: "flex",
                  }}
                >
                  Back to login
                </a>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <h5>Reset Password</h5>
            <Form
              name="reset-password"
              initialValues={{ remember: true }}
              style={{ minWidth: 360, textAlign: "left" }}
              layout="vertical"
							onFinish={onNewPasswordSave}
            >
              {isNewPassword ? (
								<>
                <Form.Item
                  name="new_password"
                  label="New Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                  ]}
                >
                  <Input
                    type="password"
                    prefix={<LockOutlined />}
                    placeholder="New Password"
                  />
                </Form.Item>
								<Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Reset your password
                </Button>
                <a
                  onClick={() => setIsForgotPasswordVisible(false)}
                  style={{
                    textAlign: "center",
                    marginTop: "1rem",
                    display: "flex",
                  }}
                >
                  Back to login
                </a>
              </Form.Item>
								</>
              ) : (
                <Form.Item label="OTP" name="otp">
                  <Input.OTP length={6} {...sharedProps} />
                  <Typography.Paragraph
                    type="secondary"
                    style={{ margin: "0.5rem 0 0" }}
                  >
                    6 digit otp sent on your email
                  </Typography.Paragraph>
                </Form.Item>
              )}
            </Form>
          </div>
        )}
      </Flex>
			) : (
				<Typography.Paragraph
					style={{ textAlign: "center", marginTop: "2rem" }}
				>
					Your new password has been saved successfully. Please login with your new credentials.<br/>
					You will be redirected to the login page in a few seconds or you can click <Typography.Link href="/">here</Typography.Link>.
				</Typography.Paragraph>
			)}
    </>
  );
};

export default ForgotPassword;
