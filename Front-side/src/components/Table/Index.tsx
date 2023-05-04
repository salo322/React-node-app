import { Table, Space, Popconfirm, Modal, Form, Input, Select, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserStore, useUserStore, User } from "./store";
import "./table.css";

const { Option } = Select;

const UserTable: React.FC = () => {
  const { users, setUsers, addUser, deleteUser, updateUser } = useUserStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleEditUser = (user: User) => {
    console.log("Before update:", user);
    setEditingUser(user);
    setIsEditModalVisible(true);
    console.log("After update:", user);
  };

  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
    console.log("clicked");
  };
  const showEditModal = () => {
    setIsEditModalVisible(true);
    console.log("clicked");
  };
  const handleOk = () => {
    form.validateFields().then((values) => {
      const user = { ...values };

      axios
        .post(`http://localhost:4000/users`, user)
        .then((response) => {
          const newUser = response.data;
          addUser(newUser);
          form.resetFields();
          setIsModalVisible(false);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  const handleEditOk = () => {
    form.validateFields().then((values) => {
      const user = { ...values };
      if (editingUser) {
        // Editing an existing user
        console.log(editingUser.id, "user id");
        axios
          .put(`http://localhost:4000/users/${editingUser.id}`, user) // remove the -1 here
          .then((response) => {
            const updatedUser = response.data;

            updateUser(editingUser.id, updatedUser);
            console.log(editingUser.id, updatedUser, "update user");
            form.resetFields();
            setEditingUser(null);
            setIsEditModalVisible(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const handleeditCancel = () => {
    form.resetFields();
    setEditingUser(null);
    setIsEditModalVisible(false);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: { street?: string; city?: string }) => (
        <>
          <div>{address?.street}</div>
          <div>{address?.city}</div>
        </>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: User) => (
        <Space size="middle">
          {/* <a onClick={() => handleEditUser(record)}>Edit</a> */}
          <Popconfirm title="Are you sure you want to delete this user?" onConfirm={() => deleteUser(record.id)} okText="Yes" cancelText="No">
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get<User[]>("http://localhost:4000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="tableButtons">
        <Button className="addButton" onClick={showModal}>
          Add New User
        </Button>
        <Button>
          <Link to="/chart">See Chart</Link>
        </Button>
      </div>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              handleEditUser(record);
              console.log(record);
            },
          };
        }}
        columns={columns}
        dataSource={users}
        rowKey="id"
      />

      <Modal title="Add User" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter a name" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter an email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Please select a gender" }]}>
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Street" name={["address", "street"]} rules={[{ required: true, message: "Please enter a street address" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="City" name={["address", "city"]} rules={[{ required: true, message: "Please enter a city" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter a phone number" },
              {
                pattern: /^\d{9}$/,
                message: "Please enter a valid 9-digit phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Edit User" open={isEditModalVisible} onOk={handleEditOk} onCancel={handleeditCancel}>
        {editingUser && (
          <Form form={form} initialValues={editingUser}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter a name" }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter an email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Please select a gender" }]}>
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Street" name={["address", "street"]} rules={[{ required: true, message: "Please enter a street address" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="City" name={["address", "city"]} rules={[{ required: true, message: "Please enter a city" }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Please enter a phone number" },
                {
                  pattern: /^\d{9}$/,
                  message: "Please enter a valid 9-digit phone number",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default UserTable;
