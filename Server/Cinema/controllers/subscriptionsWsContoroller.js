const express = require('express');
const router = express.Router();
const axios = require('axios');
//get all subscriptions
router.route('/').get(async(req,resp)=>{
    let subscriptions=await axios.get("http://localhost:8000/api/subscriptions");
    return resp.json(subscriptions.data);
})
//get by id 
router.route('/:id').get(async(req,resp)=>{
    let id=req.params.id;
    let subscription= await axios.get(`http://localhost:8000/api/subscriptions/${id}`);
    return resp.json(subscription.data);
})
//// get by member id
router.route('/:id/memberid').get(async(req,resp)=>{
    let id=req.params.id;
    let subs=await axios.get(`http://localhost:8000/api/subscriptions`)
    subs=subs.data
    console.log(subs);
    console.log("hey");
    let index=subs.find(x=>x.memberId==id);
    console.log(index);
    if(index==-1){
        return resp.json("no sub")
    }
    else{
        return resp.json(subs[index].data);
    }
})
// add subscription
router.route('/').post(async(req,resp)=>{
    let newsubscription=req.body;
    let addsubscription=await axios.post(`http://localhost:8000/api/subscriptions`,newsubscription);
    return resp.json(addsubscription.data);
})
//update subscription
router.route('/:id').put(async(req,resp)=>{
    let id=req.params.id;
    let updatesubscription=req.body;
    let update= await axios.put(`http://localhost:8000/api/subscriptions/${id}`,updatesubscription);
    return resp.json(update.data)
})
//delete subscription
router.route('/:id').delete(async(req,resp)=>{
    let id=req.params.id;
    let deletesubscriptions= await axios.delete(`http://localhost:8000/api/subscriptions/${id}`);
    return resp.json(deletesubscriptions.data);
})
module.exports = router;