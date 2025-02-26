const router = require(`express`).Router()

const ordersModel = require(`../models/orders`)


// read all records
router.get(`/orders`, (req, res) => 
{   
    //user does not have to be logged in to see car details
    ordersModel.find((error, data) => 
    {
        res.json(data)
    })
})


// Read one record
router.get(`/orders/:id`, (req, res) => 
{
    ordersModel.findById(req.params.id, (error, data) => 
    {
        res.json(data)
    })
})


// Add new record
router.post(`/orders`, (req, res) => 
{
    ordersModel.create(req.body, (error, data) => 
    {
        res.json(data)
    })
})


// Update one record
router.put(`/orders/:id`, (req, res) => 
{
    ordersModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
    {
        res.json(data)
    })        
})


// Delete one record
router.delete(`/orders/:id`, (req, res) => 
{
    ordersModel.findByIdAndRemove(req.params.id, (error, data) => 
    {
        res.json(data)
    })       
})

module.exports = router