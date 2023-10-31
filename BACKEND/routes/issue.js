const express = require('express')
const router = express.Router();
const Issue = require('../models/issue')
const checkauth = require('../check-auth')




router.get('/:id', (req, res) => {
    Issue.find()
    .then((issue) => {
        res.status(200).json({
            message: 'Issue Found',
            issue:issue,
        });
    })
    .catch((error) => {
        res.status(500).json({
            error:error,
        });
    });
});

router.post('', checkauth, (req, res) => {
    const issue = new Issue (
        {
            id: req.body.id,
            issue: req.body.issue
        }
    )
    issue.save().then(() =>{
        res.status(201).json({
            message: 'Issue created',
            issue:issue
        })
    })
})

router.delete('/:id', checkauth, (req, res) =>{
    Issue.deleteOne({_id: req.params.id})
    .then((result)=>
    {
        res.status(200).json({message: "Issue Deleted"});
    });
})

module.exports = router;