const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().sort('name');
        res.send(customers);
    } catch (error) {
        return res.status(404).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        if(!customer) return res.status(404).send("Customer with this ID not found");
        res.send(customer);
    } catch (error) {
        return res.status(404).send(error);
    }
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })

    try {
        const result = await customer.save();
        return res.send(customer);
    } catch (ex) {
        for(field in ex.errors) {
            console.log(ex.errors[field]);
        }
        return res.status(404).send(ex.errors);
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        const customer = await Customer.findById(req.params.id);    
        customer.set({ 
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        });
        customer.save();
        return res.send(customer);
    } catch (error) {
        return res.status(404).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findOneAndDelete({ _id: req.params.id });
        if(!customer) return res.status(404).send('The customer with the given ID was not found.');
        return res.send(customer);
    } catch (error) {
        return res.status(404).send(error);
    }
});

module.exports = router;