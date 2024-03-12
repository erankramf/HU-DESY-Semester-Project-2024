import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { getFile } from '../api/Service';
import DownloadIcon from '@mui/icons-material/Download';

interface DataItem {
  Parameter: string;
  Value: any;
}

interface Props {
  document: DataItem[];
  shouldLink : boolean;
}

const DataTable: React.FC<Props> = ({ document: data, shouldLink }) => {
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
          {data.map((row: DataItem, index: number) => 
          {
            console.log(`row ${index} is ${row}`)
            return (
            <TableRow key={index}>
              <TableCell>{row.Parameter}</TableCell>
              <TableCell>{row.Value}{shouldLink && <Button startIcon={<DownloadIcon></DownloadIcon>}  onClick={async ()=> {try {
                  const response = await getFile(row.Value);
                  const url = URL.createObjectURL(response.data);
                  const element = document.createElement('a');
                  element.href = url;
                  element.download = `${row.Value}`;
                  element.style.display = 'none';
                  document.body.appendChild(element);
                  element.click();
                  element.remove();
                  URL.revokeObjectURL(url);

                  return console.log(response);
                } catch (e) {
                  return console.log(e);
                }}}></Button>}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;