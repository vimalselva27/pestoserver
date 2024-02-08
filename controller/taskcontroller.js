const Task = require('../model/Task');
const {body,validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');


exports.task_list = asyncHandler(async(req,res,next)=>{
   const results = await Task.find({})
       .sort({title:1})
       .exec();
   res.json(results);
});

exports.task_details = asyncHandler(async(req,res,next)=>{

    res.send(`Not implemented, ${req.params.id}`)
})

exports.task_create = [
    // Validate and sanitize the name field.
    body("title", "Invalid Title")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body("description")
        .trim()
        .escape(),

    body('status')
        .trim()
        .escape()
        .custom((value)=> ['To Do','In Progress','Done'].includes(value))
        .withMessage('Invalid Status'),

    asyncHandler(async(req,res,next)=>{
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        // Create a genre object with escaped and trimmed data.
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            status : req.body.status
        });
        await task.save();
        return res.json(task);
})]

exports.task_update = [
    // Validate and sanitize the name field.
    body("title", "Invalid Title")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body("description")
        .trim()
        .escape(),

    body('status')
        .trim()
        .escape()
        .custom((value)=> ['To Do','In Progress','Done'].includes(value))
        .withMessage('Invalid Status'),
    asyncHandler(async(req,res,next)=>{
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        await Task.findByIdAndUpdate(req.params.id,{title: req.body.title,description: req.body.description, status: req.body.status});
        return res.json({updated:true})
})]

exports.task_delete = asyncHandler(async(req,res,next)=>{
    await Task.findByIdAndDelete(req.params.id);
    return res.json({deleted:true})
})
