const Objective = require('../models/objectiveModel')
const User  = require('../models/userModel')


// @desc Get objectives
// @route GET /api/objectives
// @access Private
const getObjectives = (req, res, next) => {
    Objective.find({ user: req.user.id })
    .then(objectives => {
        console.log(objectives)
        res.status(200).json(objectives)
    })
    .catch(err => next(err))
}

// @desc Create objective
// @route POST /api/objectives
// @access Private
const createObjective = (req, res, next) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('text field is required')
    }

    Objective.create({
        text: req.body.text,
        user: req.user.id,
    })
    .then(objective => {
        res.json(objective)
    }).catch(err => next(err))
    
}

// @desc  Get specific objective
// @route GET /api/objectives/:id
// @access Private
const getObjective = (req, res, next) => {
    Objective.findById(req.params.id)
    .then(objective => {
        res.json(objective)
    })
    .catch(err => next(err))
}

// @desc  Update specific objective
// @route PUT /api/objectives/:id
// @access Private
const updateObjective = (req, res, next) => {
    Objective.findById(req.params.id)
    .then(objective => {
        if (!objective) {
            throw new Error(`Objective id ${req.params.id} not found`)
        }

        if (objective.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('You are authorize for this objective')
        }

        Objective.findByIdAndUpdate(objective._id, req.body, { new: true })
        .then(objective => {
            res.json(objective)
        }).catch(err => next(err))
    })
    .catch(err => next(err))
}

// @desc Delete specific objective
// @route DELETE /api/objectives/:id
// @access Private
const deleteObjective = (req, res, next) => {
    Objective.findById(req.params.id)
    .then(objective => {
        if (!objective) {
            throw new Error(`Objective id ${req.params.id} not found`)
        }

        if (objective.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('You are authorize for this objective')
        }

        objective.remove()
        res.json({id: req.params.id})
    })
    .catch(err => next(err))
}

module.exports = {
    getObjectives,
    createObjective,
    updateObjective,
    deleteObjective,
    getObjective
}