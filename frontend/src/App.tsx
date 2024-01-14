import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CollapsibleComponent from './components/collapsible'
import TelescopesList from './components/TelescopesList';  

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <CollapsibleComponent title="hello" children="world"></CollapsibleComponent>
    </>
  )
}

export default App
