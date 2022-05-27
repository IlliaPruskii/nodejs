const path = require('path')
const express = require('express')

const routes = require('./routes')

const port = 3000

const app = express()

app.use(express.json()); 
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')))

app.use('/user', routes.router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})