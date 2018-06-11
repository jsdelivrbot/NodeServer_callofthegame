const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var chall = require('../ChallengeModule/challenge_module')

express()
  .use(express.static(path.join(__dirname, '../client')))
  .set('views', path.join(__dirname, '../client'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('index', { challenge_name: chall.load_challenge() }))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))