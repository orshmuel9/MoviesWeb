const express = require('express');
const subscriptionBL=require('../models/subscriptionBL');
const router = express.Router();
//get all subscriptionBL
router.route('/').get( async(req,resp)=>{
    
    let data=await subscriptionBL.getAllSubscriptions();
    return resp.json(data);
})

//get by id
router.route('/:id').get(async (req,resp)=>{
    let id=req.params.id;
    let data= await subscriptionBL.getSubscriptionById(id);
    return resp.json(data);
})

//add subscription

router.route('/').post(async(req,resp)=>{
    let newsubscription=req.body;
    let data=await subscriptionBL.addSubscription(newsubscription);
    return resp.json(data);
})

//updade subscription
router.route('/:id').put(async(req,resp)=>{
    let updatesubscription=req.body;
    let id=req.params.id;
    let data=await subscriptionBL.updateSubscription(updatesubscription,id);
    return resp.json(data);
})

//delete subscription
router.route('/:id').delete(async (req,resp)=>{
    let id=req.params.id;
    let data= await subscriptionBL.deleteSubscription(id);
    return resp.json(data);
})

module.exports = router