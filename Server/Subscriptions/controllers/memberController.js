const express = require('express');
const memberBL=require('../models/memberBL');
const router = express.Router();

//get all
router.route('/').get( async(req,resp)=>{
    
    let data=await memberBL.getAllMembers();
    return resp.json(data);
})

//get by id
router.route('/:id').get(async (req,resp)=>{
    let id=req.params.id;
    let data= await memberBL.getMemberById(id);
    return resp.json(data);
})

//add memeber

router.route('/').post(async(req,resp)=>{
    let newmember=req.body;
    let data=await memberBL.addMember(newmember);
    return resp.json(data);
})

//updade member
router.route('/:id').put(async(req,resp)=>{
    let updatedmember=req.body;
    let id=req.params.id;
    let data=await memberBL.updateMember(updatedmember,id);
    return resp.json(data);
})

//delete member
router.route('/:id').delete(async (req,resp)=>{
    let id=req.params.id;
    let data= await memberBL.deletemember(id);
    return resp.json(data);
})

module.exports = router