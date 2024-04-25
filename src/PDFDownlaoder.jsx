import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
  View,
} from "@react-pdf/renderer";


const MyDocument = ({data}) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Student Information</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCellHeader}>
            <Text>Name</Text>
          </View>
          <View style={styles.tableCellHeader}>
            <Text>Roll Number</Text>
          </View>
        </View>
        {data?.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>{item.name}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{item.rollNo}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCell: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  tableCellHeader: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
});

const PDFDownloader = ({ data }) => (
  <div>
    <PDFDownloadLink
      document={<MyDocument data={data} />}
      fileName="students.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download PDF"
      }
    </PDFDownloadLink>
  </div>
);

export default PDFDownloader;
