import express from 'express'
import bodyParser from 'body-parser'
import router from './router'

const server = express()
  .use(bodyParser.json())
  .use(router)

export default server
