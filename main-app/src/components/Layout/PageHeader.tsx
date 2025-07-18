import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DownOutlined, SettingOutlined, UserOutlined, LogoutOutlined, ProfileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Flex, Dropdown, Space, Typography, Avatar } from "antd";

interface UserProps {
  loginUser: {
    profilePic: String;
  };
}

const PageHeader: React.FC<UserProps> = ({ loginUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    await dispatch({
      type: "apiRequest",
      payload: {
        url: `/api/account/logout`,
        method: "POST",
        onError: (getError: any) => {
          if(getError?.status === 403) {
              navigate("/");
          }
        },
        onSuccess: () => {
            navigate("/");
        },
        dispatchType: "accountLogout",
      },
    });
  }

  const items: MenuProps["items"] = [
    {
      key: "/profile",
      label: "My Profile",
      icon: <ProfileOutlined />,
      onClick: (e) => {
        navigate("/profile");
      },
    },
    {
      type: "divider",
    },
    {
      key: "Logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: logout
    },
    {
      key: "Settings",
      label: "Settings",
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Flex justify="space-between" align="center" style={{ padding: "0 16px" }}>
      <Typography.Title level={3}>Dashboard</Typography.Title>
      <Flex justify="center" align="center">
        <Avatar
          size={42}
          icon={<UserOutlined />}
          style={{ marginRight: "0.5rem" }}
          src={`http://localhost:3001/uploads/${loginUser?.profilePic}`}
        />
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Ashutosh Kumar
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Flex>
    </Flex>
  );
};

export default PageHeader;
