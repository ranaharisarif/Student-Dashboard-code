
import React, { useState } from "react";
import { ref, set } from "firebase/database";
import database from "./firebase";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadCSVToDatabase = ({ refreshTable, setData }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async ({ file }) => {
    try {
      setUploading(true);

      const reader = new FileReader();

      reader.onload = async (e) => {
        const text = e.target.result;
        const parsedData = parseCSV(text);
        const response = await uploadToDatabase(parsedData);
        setData(parsedData.map((a, i) => ({ ...a, id: i })));
        console.log(
          parsedData.map((a, i) => ({ ...a, id: i })),
          response
        );
        console.log("Data uploaded successfully");
        message.success("Data uploaded successfully");
        refreshTable();
        setUploading(false);
        return response; 
      };

      reader.readAsText(file);
    } catch (error) {
      console.error("Error reading file:", error);
      setUploading(false);
      throw error;
    }
  };

  const parseCSV = (csvData) => {
    const lines = csvData.split("\n");
    const headers = lines[0].split(",").map((header) => header.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((value) => value.trim());
      const rowData = {};
      headers.forEach((header, index) => {
        rowData[header] = values[index];
      });
      data.push(rowData);
    }

    return data;
  };

  const uploadToDatabase = async (data) => {
    const databaseRef = ref(database, "students");

    try {
      let response = await set(databaseRef, data);
      return response;
    } catch (error) {
      console.error("Error uploading data to database:", error);
      throw error;
    }
  };

  return (
    <Upload
      fileList={fileList}
      beforeUpload={(file) => {
        setFileList([file]);
        return false; 
      }}
      onChange={handleUpload}
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />} type="primary" loading={uploading}>
        {uploading ? "Uploading..." : "Select CSV File"}
      </Button>
    </Upload>
  );
};

export default UploadCSVToDatabase;
