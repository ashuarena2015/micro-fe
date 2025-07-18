import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import {
  ProfileOutlined,
  AppstoreAddOutlined,
  HomeOutlined,
  GroupOutlined,
  UsergroupAddOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme, Button } from "antd";
import PageHeader from "./PageHeader";
import './Layout.css';
import { RootState } from "../../redux/store";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const items: MenuProps["items"] = [
    {
        key: "/dashboard",
        icon: <HomeOutlined />,
        label: "Dashboard",
    },
    {
        key: "/users",
        icon: <UsergroupAddOutlined />,
        label: "Users",
    },
    
];

const LayoutWrapper: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleClick = (e: any) => {
    navigate(e.key); // Navigate to route using menu item key
  };

  const { loginUser } = useSelector((state: RootState) => state.parentRedux?.userReducer);
  const [isAuthenticationLoading, setIsAuthenticationLoading] = React.useState(true);
  const [isAuth, setIsAuth] = React.useState(false);

  const dispatch = useDispatch();
  const authentication = async () => {
    const response = await dispatch({
      type: "apiRequest",
      payload: {
        url: `/api/account/auth`,
        method: "GET",
        onError: (getError: any) => {
          if(getError?.status === 403) {
              navigate("/");
          }
        },
        onSuccess: (getSuccessResponse: any) => {
          if(getSuccessResponse?.data?.isAuthLogin) {
            console.log('getSuccessResponse?.data', getSuccessResponse?.data);
            setIsAuthenticationLoading(false);
            setIsAuth(true);
            dispatch({
              type: 'users/setLoginUser',
              payload: {
                loginUser: getSuccessResponse?.data?.user
              }
            })
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

  const [collapsed, setCollapsed] = useState(false);

  const defaultMenuKey = window.location.pathname;
  return (
    <div className="main-layout">
      <Layout hasSider>
        <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[defaultMenuKey]}
            items={items}
            onClick={handleClick}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <PageHeader
              // @ts-ignore
              loginUser={loginUser}
            />
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              style={{
                padding: 24,
                textAlign: "center",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
            <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ========== Micro FrontEnd with React and Ant Design ==========
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutWrapper;
