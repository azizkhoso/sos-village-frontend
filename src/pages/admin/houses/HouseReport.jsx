import React, { useState } from 'react';

import {
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';

import moment from 'moment';

import { useLocation, useParams } from 'react-router-dom';

import { useQuery } from 'react-query';

import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';

import useToastsStore from '../../../stores/toasts';

import { getReport } from '../../../api/admin/records';

const pdfStyles = StyleSheet.create({
  section: {
    marginVertical: '2rem',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default function NewHouse() {
  const { id: houseId } = useParams();
  const { state: house } = useLocation();
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2022);
  const toastsStore = useToastsStore((state) => state);
  const { data } = useQuery([houseId, month, year], () => getReport({ month, year }, houseId), {
    onError: (err) => toastsStore.addToast({ message: err.response?.data?.error || err.message, severity: 'error' }),
  });
  console.log(data);
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <Typography variant="h6" align="center" className="w-full lg:w-9/12">House Report</Typography>
      <Grid container direction="column" rowSpacing={3} maxWidth="md">
        <Grid item container xs={12} lg={8} alignItems="center" rowSpacing={1}>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Month</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <Select
              fullWidth
              size="small"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))
              }
            </Select>
          </Grid>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Year</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              type="number"
              inputProps={{
                min: 0,
              }}
              fullWidth
              size="small"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <PDFViewer width="100%" height="100%" style={{ minHeight: 600 }}>
            <Document>
              <Page size="A4" style={{ fontSize: 12, padding: 24 }}>
                <View style={pdfStyles.section}>
                  <Text style={pdfStyles.heading}>
                    {house.name}
                  </Text>
                </View>
                <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text>
                    For:
                    {` ${moment(new Date(`${year}-${month}-01`)).format('MMM, YYYY')}`}
                  </Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </Grid>
      </Grid>
    </div>
  );
}
