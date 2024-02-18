// import { useEffect, useState } from 'react'
// import './App.css'
// import { Box, Container, Grid, createStyles, CssBaseline } from '@mui/material'
// import { DataSelector } from './components/DataSelector'
// import { bgcolor } from '@mui/system'
// //South-LST-D
// const useStyles = createStyles({
//   blah: {
//   }
// })
// function App() {
//   const [text, setText] = useState("");
//   return (
//     <>
//       <CssBaseline />
//       <Container maxWidth="xl" sx={{ height: '50vh', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
//         <DataSelector onGotData={(data) => setText(data as string)}></DataSelector>
//       </Container>
//       <Container sx={{ bgcolor: 'background.paper' }}>
//         {text}
//       </Container>
//       {/*<Grid container sx={{ p: 2, height: '30vh', bgcolor: 'background.paper' }}>
//       </Grid>*/}
//     </>
//   )
// }

// export default App

import { useEffect, useState } from 'react';
import './App.css';
import { Box, Container, Grid, createStyles, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { DataSelector } from './components/DataSelector';
import { bgcolor } from '@mui/system';

// Define a custom theme with the desired background color
const theme = createTheme({
  palette: {
    background: {
      default: '#f0f0f0',
    },
  },
});

const useStyles = createStyles({
  blah: {
  }
});

function App() {
  const [text, setText] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ height: '50vh', display: 'flex', flexDirection: 'column' }}>
        <DataSelector onGotData={(data) => setText(data as string)}></DataSelector>
      </Container>
      <Container >
        {text}
      </Container>
      {/*<Grid container sx={{ p: 2, height: '30vh', bgcolor: 'background.paper' }}>
      </Grid>*/}
    </ThemeProvider>
  );
}

export default App;
