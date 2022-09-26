import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Form from './components/Form'
//import ServerTest from './components/ServerTest'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  return (
    <ChakraProvider>
      <div className='app'>{user ? <h1>Hoşgeldiniz</h1> : <Form setUser={setUser} />}</div>
      {/* <div className='app'>
        <ServerTest />
      </div> */}
    </ChakraProvider>
  )
}

export default App
