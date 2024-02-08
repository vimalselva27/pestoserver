const mongoose = require('mongoose');
const {Schema} = mongoose;

const TaskSchema = new Schema({
    title:{
        type : String,
        required: true
    },
    description: {
        type: String
    },
    status:{
        type: String,
        required: true,
        enum:['To Do','In Progress','Done']
    }
})

module.exports = mongoose.model('Task',TaskSchema);