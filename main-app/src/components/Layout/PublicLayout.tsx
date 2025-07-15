import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { useDispatch } from "react-redux";

const { Content } = Layout;

const PublicLayoutWrapper: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isAuthenticationLoading, setIsAuthenticationLoading] = React.useState(true);
  const [isAuth, setIsAuth] = React.useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const authentication = async () => {
    const response = await dispatch({
      type: "apiRequest",
      payload: {
        url: `/api/account/auth`,
        method: "GET",
        onError: "GLOBAL_MESSAGE",
        onSuccess: (getSuccessResponse: any) => {
          if(getSuccessResponse?.data?.isAuthLogin) {
            setIsAuthenticationLoading(false);
            setIsAuth(true);
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        },
        dispatchType: "accountAuthentication",
      },
    });
  }
  useEffect(() => {
    authentication();
  }, []);

  return (
      <Layout>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
  );
};

export default PublicLayoutWrapper;
