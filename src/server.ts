import express = require('express')
import bodyParser = require('body-parser')
import router from './router'

export const server = express()
  .use(bodyParser.json())
  .use(router)
