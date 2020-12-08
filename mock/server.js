const express = require('express')
const app = express()
const router = express.Router()

app.get('/', (req, res) => {
  res.send('hello world')
})

router.use('/test', require('./test'))
router.use('/', require('./config'))

app.use('/', router)

app.listen(3001)
