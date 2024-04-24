import React, { useState } from "react";
import { ref, set } from "firebase/database";
import database from "./firebase";
import { Button, message } from "antd";
const UploadCSVToDatabase = ({ refreshTable, setData }) => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const text = e.target.result;
          const parsedData = parseCSV(text);
          await uploadToDatabase(parsedData);
          setData(parsedData.map((a,i)=>({...a,id:i})));
          console.log(parsedData.map((a,i)=>({...a,id:i})));
          console.log("Data uploaded successfully");
          message.success("Data uploaded successfully");
          refreshTable();
        };

        reader.readAsText(file);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    } else {
      console.error("No file selected");
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
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload} type="primary">
        Upload
      </Button>
    </div>
  );
};

export default UploadCSVToDatabase;
