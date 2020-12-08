const Mock = require('mockjs')
const express = require('express')
const router = express.Router()

router.use('/config', (req, res) => {
  console.log('这里：', req.body)
  // 调用 mock 方法模拟数据
  const data = Mock.mock({
    name: 'Frankie',
    age: 20
  })
  return res.json(data)
})

module.exports = router
