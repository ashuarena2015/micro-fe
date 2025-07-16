import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Flex, Descriptions, Button, Radio } from "antd";
import type { DescriptionsProps, RadioChangeEvent } from "antd";
import { RootState } from '../../redux/store';
import { userInfoDesc } from './common';

const Profile = () => {
  const [size, setSize] = useState<"default" | "middle" | "small">("default");

  const { user } = useSelector((state: RootState) => state.userReducer);
  console.log({user});

    const items: DescriptionsProps["items"] = userInfoDesc(user) || [];

  const onChange = (e: RadioChangeEvent) => {
    console.log("size checked", e.target.value);
    setSize(e.target.value);
  };

  return (
    <Flex style={{ height: "100vh" }}>
      <Flex>
        <div>
          <Descriptions layout="vertical" items={items} />
        </div>
      </Flex>
      <Flex>Right</Flex>
    </Flex>
  );
};

export default Profile;
