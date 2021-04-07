const express = require('express');
const router = express.Router();
const userBL = require('../models/userBL');


// for changes in json
const JsonBL = require('../json/JsonBL')
const fileperm='./json/permision.json'
const fileuser='./json/users.json'
//get all

router.route('/').get(async (req, resp) => {
    let data = await userBL.getAllUsers();
    let perm=await JsonBL.GetAll(fileperm);
    let userJson=await JsonBL.GetAll(fileuser);
    let arr=[];
    for(let i=0;i<data.length;i++)
    {
        let obj={
            user:data[i],
            perm:perm[i],
            userJson:userJson[i]
        }
        arr.push(obj)
    }
    return resp.json(arr);
})
//get perm by id
router.route('/:id/perm').get(async(req,resp)=>{
    let id=req.params.id;
    let perm= await JsonBL.GetById(fileperm,id);
    return resp.json(perm)
})
//get Json by id
router.route('/:id/userJson').get(async(req,resp)=>{
    let id=req.params.id;
    let json=await JsonBL.GetById(fileuser,id);
    return resp.json(json)
})
//for login
router.route('/login').post(async(req,resp)=>{
    let option=req.body;
    let data=await userBL.getAllUsers();
    let bol=false;
    let username="";
    let id=""
    data.forEach(user => 
    {
        if(user.username==option.username && user.password==option.password && user.password != "needtocreateuser"){
            bol=true;
            username=user.username;
            id=user._id
        }
    });
    let obj={
        bol:bol,
        username:username,
        id:id
    }
    return resp.json(obj);
})

//create new user
router.route('/create').post(async(req,resp)=>{
    let option=req.body;
    let data=await userBL.getAllUsers();
    let id=-1;
    let response;
    data.forEach(user=>{
        if(user.username==option.username && user.password == "needtocreateuser" && option.password != "needtocreateuser"){
            id=user._id;
        }
    })
    if(id==-1){
        response="No user";
    }
    else{
        let obj={
            username:option.username,
            password:option.password
        }
        await userBL.updateUser(obj,id);
        response="Created user"
    }
    return resp.json(response)
})
// get by id

router.route('/:id').get(async (req, resp) => {
    let id = req.params.id;
    let data = await userBL.getUserById(id);
    let perm= await JsonBL.GetById(fileperm,id);
    let userJson= await JsonBL.GetById(fileuser,id);
    let obj={
        user:data,
        perm:perm,
        userJson:userJson
    }
    return resp.json(obj);
})



// add user
router.route('/').post(async (req, resp) => {
    let newUser = req.body
    let data = await userBL.addUser(newUser.user);
    newUser.userJson={id:data._id,...newUser.userJson};
    newUser.perm={id:data._id,...newUser.perm};
    await JsonBL.Add(newUser.userJson,fileuser);
    await JsonBL.Add(newUser.perm,fileperm)
    return resp.json("user created")
})
// update user
router.route('/:id').put(async (req, resp) => {

    let id = req.params.id
    let user = req.body
    let data = await userBL.updateUser(user.user,id)
    //data = resolve = id
    user.userJson={id:data,...user.userJson};
    user.perm={id:data,...user.perm};
    await JsonBL.UpdateData(user.userJson,fileuser,id);
    await JsonBL.UpdateData(user.perm,fileperm,id);
    return resp.json("userUpdated")

})
//delet user
router.route('/:id').delete(async (req, resp) => {

    let id = req.params.id
    let answer = await userBL.deleteUser(id)
    await JsonBL.deleteData(id,fileperm);
    await JsonBL.deleteData(id,fileuser)
    return resp.json(answer)

})



module.exports = router