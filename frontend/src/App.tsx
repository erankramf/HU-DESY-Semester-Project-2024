import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import CollapsibleComponent from './components/collapsible'
import { getParams, getTelescopes } from './api/Service'
//South-LST-D
function App() {
  const [text, setText] = useState("")
  const [telescopeName, setTelescopeName] = useState("")
  const getT = () => {
    getTelescopes().then(value=>{
      console.log(value)
      setText(value.data);
    }).catch(err =>
      console.log(err));
    }
  const getP = () => {
    getParams(telescopeName).then(value=>{
      console.log(value)
      setText(value.data);
    }).catch(err =>
      console.log(err));
  };
  return (
    <>
        <CollapsibleComponent title="hello" children="world"></CollapsibleComponent>

        <div onClick={getT} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ marginRight: '10px' }}>Get Telescopes</span>
        </div>

        <div onClick={getP} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ marginRight: '10px' }}>Get Params</span>
        </div>
        <input type="text" value={telescopeName} onChange={event => setTelescopeName(event.target.value)}></input>
        <h1>{text}</h1>
    </>
  )
}

export default App
