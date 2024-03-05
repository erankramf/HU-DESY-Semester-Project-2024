import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface DataItem {
  Parameter: string;
  Value: any;
}

interface Props {
  document: DataItem[];
}

const DataTable: React.FC<Props> = ({ document }) => {
  const convertDocumentToArray = (document: any): DataItem[] => {
    const { Parameter, Value } = document;
    console.log(document);
    console.log([{ Parameter, Value }]);
    return [{ Parameter, Value }];
  };

  const data = document;

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
          {/* <TableRow key={1}>
              <TableCell>{"Param"}</TableCell>
              <TableCell>{1}</TableCell>
          </TableRow>         
          <TableRow key={2}>
              <TableCell>{"Param"}</TableCell>
              <TableCell>{2}</TableCell>
          </TableRow>          
          <TableRow key={3}>
              <TableCell>{"Param"}</TableCell>
              <TableCell>{3}</TableCell>
          </TableRow> */}
          {data.map((row: DataItem, index: number) => 
          {
            console.log(`row ${index} is ${row}`)
            return (
            <TableRow key={index}>
              <TableCell>{row["Parameter"]}</TableCell>
              <TableCell>{row.Value}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;