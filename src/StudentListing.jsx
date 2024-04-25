import React, { useState, useRef, useEffect } from "react";
import { ProTable, ModalForm } from "@ant-design/pro-components";
import { Button, Space, Modal, Form, Input } from "antd";
import database from "./firebase";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ref, get, remove, update } from "firebase/database";
import Upload from "./Upload";
import PDFDownloader from "./PDFDownlaoder";

const StudentListing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const studentsRef = ref(database, "students");
      const snapshot = await get(studentsRef);
      const students = [];
      snapshot.forEach((childSnapshot) => {
        students.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setData(students);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (record) => {
    Modal.confirm({
      title: "Confirm",
      content: `Are you sure you want to delete ${record.name}?`,
      onOk: async () => {
        await remove(ref(database, `students/${record.id}`));
        setData(data.filter((student) => student.id !== record.id));
      },
    });
  };

  const handleEdit = async (values, record) => {
    try {
      await update(ref(database, `students/${record.id}`), values);
      const updatedData = data.map((student) =>
        student.id === record.id ? { ...student, ...values } : student
      );
      setData(updatedData);
      return true;
    } catch (error) {
      console.error("Error updating student:", error);
      return false;
    }
  };
  const columns = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Name",
      dataIndex: "name",
      copyable: true,
      ellipsis: true,
    },
    {
      title: "Roll No",
      dataIndex: "rollNo",
      copyable: true,
      ellipsis: true,
    },
    {
      title: "Actions",
      render: (record) => (
        <Space>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
          <ModalForm
            title="Edit Student"
            trigger={
              <Button icon={<EditOutlined />} type="link">
                Edit
              </Button>
            }
            onFinish={(values) => handleEdit(values, record)}
            initialValues={record}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Roll No"
              name="rollNo"
              rules={[
                { required: true, message: "Please input the roll number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </ModalForm>
        </Space>
      ),
    },
  ];
  const actionRef = useRef();
  const refreshTable = () => actionRef?.current?.reload();
  console.log(actionRef);
  return (
    <ProTable
      actionRef={actionRef}
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      dateFormatter="string"
      search={false}
      options={false}
      setting={false}
      toolBarRender={() => [
        <Upload refreshTable={refreshTable} setData={setData} />,
        <PDFDownloader data={data} />,
      ]}
    />
  );
};

export default StudentListing;
