const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080

app.use(cors())

app.get('/test', (req, res) => {
  getRandomInt(2) ? res.status(200).json({ message: 'Hello There !' + getRandomInt(500) }) : res.status(404).send()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}
