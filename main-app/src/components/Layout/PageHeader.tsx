import React from "react";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Flex, Dropdown, Space, Typography } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "My Account",
    // disabled: true,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Profile",
    extra: "⌘P",
  },
  {
    key: "3",
    label: "Billing",
    extra: "⌘B",
  },
  {
    key: "4",
    label: "Settings",
    icon: <SettingOutlined />,
    extra: "⌘S",
  },
];

const PageHeader: React.FC = () => {
  return (
    <Flex justify="space-between" align="center" style={{ padding: "0 16px" }}>
        <Typography.Title level={3}>Dashboard</Typography.Title>
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Ashutosh Kumar
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
    </Flex>
  );
};

export default PageHeader;
