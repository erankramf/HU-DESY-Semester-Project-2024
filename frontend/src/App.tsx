import { useEffect, useState } from 'react'
import './App.css'
import { Box, Container, Grid, createStyles } from '@mui/material'
import { DataSelector } from './components/DataSelector'
import { bgcolor } from '@mui/system'
//South-LST-D
const useStyles = createStyles({
  blah:{
  }
})
function App() {
  const [text, setText] = useState("");
  return (
    <>
    <Container sx={{height:'30vh', bgcolor:'background.paper'}}>
      <DataSelector onGotData={(data) => setText(data as string)}></DataSelector>
    </Container>
    <Container sx={{bgcolor:'background.paper', p:3}}>
      {text}
    </Container>
    {/* <Grid container  sx={{p:2, height:'30vh',bgcolor:'background.paper'}}>
    </Grid> */}
    </>
  )
}

export default App
