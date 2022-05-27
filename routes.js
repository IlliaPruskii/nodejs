const express = require('express')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const User = require('./models/user.js')

const router = express.Router()

const createUserSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().required(),
})

router.post('/', validator.body(createUserSchema), (req, res) => {
  const user = new User(null, req.body.login, req.body.password, req.body.age)
  user.save()

  res.send('User was successfully created!')
})

router.get('/', (req, res) => {
  User.fetchAll((users) => {
    res.send(users)
  })
})

const getUserSchema = Joi.object({
  id: Joi.string().required(),
})

router.get('/getUser/:id', validator.params(getUserSchema), (req, res) => {
  const userId = req.params.id;
  User.fetchAll((users) => {
    const user = users.find((user) => user.id === userId)
    res.send(user)
  })
})

const getAutoSuggestUsersSchema = Joi.object({
  loginSubstring: Joi.string().required(),
  limit: Joi.string().required(),
})

router.get('/getAutoSuggestUsers/:id', validator.query(getAutoSuggestUsersSchema), (req, res) => {
  console.log('req.params.id', req.query)
  const { loginSubstring, limit } = req.query;
  User.fetchAll((users) => {
    const filteredUser = users.filter(user => user.login.includes(loginSubstring))
    res.send(filteredUser.slice(0, Number(limit)))
  })
})

const updateUserSchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.string().required(),
})

router.patch('/', validator.body(updateUserSchema), (req, res) => {
  const user = new User(req.body.id, req.body.login, req.body.password, req.body.age)
  user.save()
  res.send('User was updated successfully!')
})

const deleteSchema = Joi.object({
  id: Joi.string().required(),
})

router.delete('/', validator.body(deleteSchema), (req, res) => {
  User.deleteById(req.body.id)
  res.send('User was successfully deleted!')
})

exports.router = router