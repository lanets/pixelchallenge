'use strict'

const _express = require('express')

const _users = require('./users')

const router = _express.Router()

// Add USERS Routes
router.use(_users)

module.exports = router
