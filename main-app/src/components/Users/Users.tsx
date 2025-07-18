// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Avatar, Badge, Button, Flex, Typography } from "antd";
import type { TableProps } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import AddNewUser from "./AddUser";

interface DataType {
  key: string;
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  email: string;
  isVerified: boolean;
  onFilter: Function;
}

interface User {
  name: string;
  email: string;
}

const Users: React.FC = () => {
  const { users } = useSelector(
    (state: RootState) => state.parentRedux.userReducer
  );

  const [isLoading, setIsLoading] = useState(false);
  
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "",
      dataIndex: "profilePic",
      key: "profilePic",
      width: 150,
      fixed: "left",
      render: (pic) => <Avatar src={`http://localhost:3001/uploads/${pic}`} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 150,
      filters: [
        {
          text: "All",
          value: "all",
        },
        {
          text: "Staffs",
          value: "staffs",
        },
        {
          text: "Students",
          value: "students",
        },
      ],
      onFilter: (value: string) => console.log({value})
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 300
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Self description",
      dataIndex: "aboutSelf",
      key: "aboutSelf",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
      width: 150,
      fixed: "right"
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState<DataType[]>([]);

  const getAllUsers = async () => {
    const response = await dispatch({
      type: "apiRequest",
      payload: {
        url: `/api/account/users`,
        method: "GET",
        onError: (getError: any) => {
          if (getError?.status === 403) {
            navigate("/");
          }
        },
        onSuccess: (getSuccessResponse: any) => {
          if (getSuccessResponse?.data?.users) {
              dispatch({
                type: "users/getUsers",
                payload: {
                  users: getSuccessResponse?.data?.users,
                },
            });
          }
        },
        dispatchType: "accountGetUsers",
      },
    });
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (users?.length) {
      setIsLoading(false);
      const fetchedUsers: DataType[] = users.map((user, i) => ({
        key: i.toString(),
        name: (
          <>
            <Badge color={user.isVerified ? "green" : "red"} /> {user.firstName}{" "}
            {user.lastName}
          </>
        ),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        //isVerified: user.isVerified,
        mobile: user.mobile || "",
        aboutSelf: user.aboutSelf || "",
        profilePic: user.profilePic,
      }));

      setAllUsers(fetchedUsers);
    }
  }, [users]);

  return (
    <Flex vertical>
      <Flex align="center" justify="space-between" style={{ padding: '1rem 0' }}>
        <Typography.Title style={{ margin: 0 }} level={5}>
          Total Users: {allUsers?.length}  
        </Typography.Title>
        <Button onClick={() => setOpen(true)}>Add user</Button>
      </Flex>
      <Table<DataType>
        columns={columns}
        dataSource={allUsers}
        loading={isLoading}
        scroll={{ x: 1300 }}
        sticky={{ offsetHeader: 64 }}
      />
      <AddNewUser setOpen={setOpen} open={open} />
    </Flex>
  )
};

export default Users;
