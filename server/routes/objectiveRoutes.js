const express = require('express')
const router = express.Router()
const { 
    getObjectives, 
    createObjective, 
    updateObjective, 
    deleteObjective,
    getObjective
} = require('../controllers/objectiveController')
const { authenticate } = require('../middleware/authentication')

router.route('/')
.get(authenticate, getObjectives)
.post(authenticate, createObjective)

router.route('/:id')
.get(authenticate, getObjective)
.put(authenticate, updateObjective)
.delete(authenticate, deleteObjective)


module.exports = router