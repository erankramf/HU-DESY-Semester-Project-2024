import { useEffect, useState } from 'react'
import './App.css'
import { Box, Container, Grid, createStyles } from '@mui/material'
import { DataSelector } from './components/DataSelector'
//South-LST-D
const useStyles = createStyles({
  blah:{
  }
})
function App() {

  return (
    <>
    <Container sx={{height:'30vh', bgcolor:'background.paper'}}>
      <DataSelector></DataSelector>
    </Container>
    
    {/* <Grid container  sx={{p:2, height:'30vh',bgcolor:'background.paper'}}>
    </Grid> */}
    </>
  )
}

export default App
