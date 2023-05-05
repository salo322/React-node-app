import React from "react";
import {
  Table,
  Space,
  Popconfirm,
  Modal,
  Form,
  Input,
  Select,
  Button,
} from "antd";
const { Option } = Select;
type MyComponentProps = {
  editingUser: any;
};
const EditUserModal = ({ editingUser }: MyComponentProps) => {
  const [form] = Form.useForm();
  return (
    <div>
      <Modal title="Edit User">
        {editingUser && (
          <Form form={form} initialValues={editingUser}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter a name" }]}
            >
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
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select a gender" }]}
            >
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Street"
              name={["address", "street"]}
              rules={[
                { required: true, message: "Please enter a street address" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="City"
              name={["address", "city"]}
              rules={[{ required: true, message: "Please enter a city" }]}
            >
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

export default EditUserModal;
