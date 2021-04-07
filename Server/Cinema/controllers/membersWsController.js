const express = require('express');
const router = express.Router();
const axios = require('axios');
//get all members
router.route('/').get(async(req,resp)=>{
    let members=await axios.get("http://localhost:8000/api/members");
    return resp.json(members.data);
})
//get by id 
router.route('/:id').get(async(req,resp)=>{
    let id=req.params.id;
    let member= await axios.get(`http://localhost:8000/api/members/${id}`);
    return resp.json(member.data);
})
// add member
router.route('/').post(async(req,resp)=>{
    let newmember=req.body;
    let addmember=await axios.post(`http://localhost:8000/api/members`,newmember);
    return resp.json(addmember.data);
})
//update member
router.route('/:id').put(async(req,resp)=>{
    let id=req.params.id;
    let updatemember=req.body;
    let update= await axios.put(`http://localhost:8000/api/members/${id}`,updatemember);
    return resp.json(update.data)
})
//delete memebr
router.route('/:id').delete(async(req,resp)=>{
    let id=req.params.id;
    let deletemember= await axios.delete(`http://localhost:8000/api/members/${id}`);
    return resp.json(deletemember.data);
})
module.exports = router;