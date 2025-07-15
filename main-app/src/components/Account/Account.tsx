import React from "react";
import {
  Flex,
} from "antd";
import Login from "../Login";

const Account: React.FC = () => {

  return (
    <>
      <Flex
        justify="center"
        style={{ height: "100vh", backgroundColor: "#f0f2f5" }}
      >
        <Login />
      </Flex>
    </>
  );
};

export default Account;
