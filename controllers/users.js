const mongodb = require('../database/mongoData')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDb().db('CSE341').collection('contacts').find()
    result.toArray((err, users) => {
        if (err) {
            res.status(400).json({message: err})
        }
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(users)
    })
}

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.')
    }
    const userId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db('CSE341').collection('contacts').find({_id: userId})
    result.toArray((err, users) => {
        if (err) {
            res.status(400).json({message: err})
        }
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(users[0])
    })
}

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDb().db('CSE341').collection('contacts').insertOne(user)
    if (response.acknowledged) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user.')
    }
}

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.')
    }
    const userId = new ObjectId(req.params.id)
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDb().db('CSE341').collection('contacts').replaceOne({_id: userId}, user)
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user.')
    }
}

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.')
    }
    const userId = new ObjectId(req.params.id)
    const response = await mongodb.getDb().db('CSE341').collection('contacts').deleteOne({_id: userId})
    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user.')
    }
}

module.exports = {getAll, getSingle, createUser, updateUser, deleteUser}