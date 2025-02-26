const router = require(`express`).Router()

const sellersModel = require(`../models/sellers`)


// read all records
router.get(`/sellers`, (req, res) => 
{   
    //user does not have to be logged in to see car details
    sellersModel.find((error, data) => 
    {
        res.json(data)
    })
})


// Read one record
router.get(`/sellers/:id`, (req, res) => 
{
    sellersModel.findById(req.params.id, (error, data) => 
    {
        res.json(data)
    })
})


// Add new record
router.post(`/sellers`, (req, res) => 
{
    sellersModel.create(req.body, (error, data) => 
    {
        res.json(data)
    })
})


// Update one record
router.put(`/sellers/:id`, (req, res) => 
{
    sellersModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
    {
        res.json(data)
    })        
})


// Delete one record
router.delete(`/sellers/:id`, (req, res) => 
{
    sellersModel.findByIdAndRemove(req.params.id, (error, data) => 
    {
        res.json(data)
    })       
})

module.exports = router