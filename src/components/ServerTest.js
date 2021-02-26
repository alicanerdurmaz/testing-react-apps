import React, { useState } from 'react'
import { Button, Stack, Heading } from '@chakra-ui/react'

const ServerTest = () => {
  const [message, setMessage] = useState()

  const onClickHandler = async () => {
    const response = await fetch('http://localhost:8080/test')

    if (response.status === 404) {
      alert('Something went wrong')
      return
    }

    const data = await response.json()
    setMessage(data.message)
  }

  return (
    <div>
      <Stack direction='row' spacing={4} mb={4}>
        <Button colorScheme='teal' size='lg' w={150} onClick={onClickHandler}>
          Send Request
        </Button>
      </Stack>

      <Heading>{message}</Heading>
    </div>
  )
}

export default ServerTest
