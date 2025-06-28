import mongoose from 'mongoose'

const problemSchema = new mongoose.Schema({
    problemStatement: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

const problemModel = mongoose.model('problem', problemSchema)

export default problemModel