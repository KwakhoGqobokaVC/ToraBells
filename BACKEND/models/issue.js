const mongoose = require('mongoose')

const issueschema = mongoose.Schema(
    {
        id: {type: String, required:true},
        issue: {type: String, required:true}
    }
)

module.exports = mongoose.model('Issue', issueschema)