import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ServerTest from './ServerTest'

const server = setupServer(
  rest.get('http://localhost:8080/test', (req, res, ctx) => {
    return res(ctx.json({ message: 'hello there' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('displays message', async () => {
  const { getByText } = render(<ServerTest />)

  const btnSendRequest = getByText(/send/i)

  fireEvent.click(btnSendRequest)

  await waitFor(() => getByText(/hello/i))
})

test('handles server error', async () => {
  server.use(
    rest.get('http://localhost:8080/test', (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )
  const { getByText } = render(<ServerTest />)

  const btnSendRequest = getByText(/send/i)

  fireEvent.click(btnSendRequest)

  await waitFor(() => getByText(/wrong/i))
})
