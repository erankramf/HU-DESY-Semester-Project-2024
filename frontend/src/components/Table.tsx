import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface DataItem {
  Parameter: string;
  Value: any;
}

interface Props {
  document: any;
}

const DataTable: React.FC<Props> = ({ document }) => {
  const convertDocumentToArray = (document: any): DataItem[] => {
    const { Parameter, Value } = document;
    return [{ Parameter, Value }];
  };

  const data = convertDocumentToArray(document);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Parameter</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: DataItem, index: number) => (
            <TableRow key={index}>
              <TableCell>{row.Parameter}</TableCell>
              <TableCell>{row.Value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;