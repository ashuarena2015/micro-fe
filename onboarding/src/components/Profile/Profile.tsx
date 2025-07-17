import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Flex, Descriptions, Button, Space } from "antd";
import type { DescriptionsProps, RadioChangeEvent } from "antd";
import { RootState } from '../../redux/store';
import { userInfoDesc } from './common';

import EditProfile from "./EditProfile";

const Profile = () => {
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state: RootState) => state.userReducer);

    const items: DescriptionsProps["items"] = userInfoDesc(user) || [];

  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <Flex style={{ height: "100vh" }}>
      <Flex gap="middle" vertical>
          <Descriptions layout="vertical" items={items} />
          <Space>
            <Button type="primary" block onClick={showDrawer}>Edit</Button>
        </Space>
        <EditProfile open={open} setOpen={setOpen} />
      </Flex>
      <Flex>Right</Flex>
    </Flex>
  );
};

export default Profile;
