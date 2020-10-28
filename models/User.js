const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, uinque: true},
  password: {type: String, required: true},
  // To add: User name, or something else
  links: [{type: Types.ObjectId, ref: 'Link' }]
})

module.exports = model('User', schema)