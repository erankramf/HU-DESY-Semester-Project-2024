import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

interface DataItem {
  [key: string]: any; // Define data item as object with dynamic keys
}

interface Props {
  title: string;
  document: DataItem[];
}

const MetaTable: React.FC<Props> = ({ document, title }) => {
  const metaDataKeys = Object.keys(document[0]).filter(key => key !== 'Value'); // Get metadata keys excluding 'Value'

  const renderValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false'; // Convert boolean values to text representation
    }
    return value;
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h4' align='center' style={{ flex: '0 0 auto' }}>{title}</Typography>
      <div style={{ flex: '1 1 auto', overflow: 'auto' }}>
        <Paper>
          <TableContainer>
            <Table>
              <TableBody>
                {metaDataKeys.map((key: string, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{renderValue(document[0][key])}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default MetaTable;

