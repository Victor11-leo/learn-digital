// Certificate.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  section: {
    margin: 12,
    padding: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  skills: {
    fontSize: 12,
    marginTop: 5,
  }
});

// PDF Component
const Certificate = ({ studentName, courseTitle, skills }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>Certificate of Completion</Text>
      <Text style={styles.subheading}>Awarded to</Text>
      <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 10 }}>
        {studentName}
      </Text>
      <Text style={styles.subheading}>For successfully completing</Text>
      <Text style={{ textAlign: 'center', fontSize: 18 }}>{courseTitle}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Skills Acquired:</Text>
        <Text style={styles.skills}>
          {skills}
        </Text>
      </View>

      <Text style={{ marginTop: 40, textAlign: 'center', fontSize: 12 }}>
        Congratulations on your achievement!
      </Text>
    </Page>
  </Document>
);

export default Certificate;
