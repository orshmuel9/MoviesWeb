const User = require('./userSchema');

//Get all
const getAllUsers=()=>{
    return new Promise((resolve,reject)=>{
        User.find({},(err,usersdata)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(usersdata);
            }
        })
    })
}
// get by id
const getUserById=(id)=>{
    return new Promise((resolve,reject)=>{
        User.findById(id,(err,userdata)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(userdata);
            }
        })
    })
}
//add user
const addUser=(user)=>{
    return new Promise((resolve,reject)=>{
        let newuser = new User({
            username:user.username,
            password:user.password
        })
        newuser.save((err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(newuser);
            }
        })
    })
}
//update user
const updateUser=(user,id)=>{
    return new Promise((resolve,reject)=>{
        User.findByIdAndUpdate(id,{username:user.username,password:user.password},(err)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(id)
            }
        })
    })
}
// delete user

const deleteUser=(id)=>{
    return new Promise((resolve,reject)=>{
        User.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("user deleted");
            }
        })
    })
}

module.exports ={getAllUsers,getUserById,updateUser,deleteUser,addUser}