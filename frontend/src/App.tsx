import { useEffect, useState } from 'react'
import './App.css'
import { Box, Container, Grid, createStyles } from '@mui/material'
import { DataSelector } from './components/DataSelector'
import { bgcolor } from '@mui/system'
import DataTable from './components/Table'
//South-LST-D
const useStyles = createStyles({
  blah: {
  }
})

interface Datapoint {
  Parameter: string;
  Value: any;
}

interface VersionData {
  Data: Datapoint[];
}
function App() {
  const [text, setText] = useState("");
  const [verData, setVerData] = useState<Datapoint[]>([]);
  return (
    <>
      <Container sx={{ height: '30vh', bgcolor: 'background.paper' }}>
        <DataSelector onGotData={(data) => {
          if (!data) return;
          setText(JSON.stringify(data, null, 2));
          var list: Datapoint[] = [];
          setVerData([]);
          data.forEach((element: any, index: string | number) => {
            var type = data[index]["Version"];
            var value = data[index]["Value"];
            var dataPoint: Datapoint = { Parameter: type, Value: value }
            list.push(dataPoint);
          });
          setVerData(list)
        }}></DataSelector>
      </Container>
      {verData && <Container sx={{ bgcolor: 'background.paper', p: 3 }}>
        <DataTable document={verData} ></DataTable>
      </Container>}
      <Container sx={{ bgcolor: 'background.paper', p: 3 }}>
        {text}
      </Container>
      {/* <Grid container  sx={{p:2, height:'30vh',bgcolor:'background.paper'}}>
    </Grid> */}
    </>
  )
}

export default App
