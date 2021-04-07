const jsonfile = require('jsonfile');

//Get All USERS/PERMISION
const GetAll = async(file)=>{
    let data=await jsonfile.readFile(file);
    let arr=data;
    return arr;
}

//Get By Id
const GetById = async(file,id)=>{
    let data=await jsonfile.readFile(file);
    let arr=data;
    let index=arr.findIndex(x=>x.id==id);
    return arr[index];
}

// ADD USER/PERMISION
const Add =async(user,file)=>{
    let data= await jsonfile.readFile(file);
    let arr=data;
    arr.push(user);
    await jsonfile.writeFile(file,arr);
}

// Update User/Permision
const UpdateData=async(updateData,file,id)=>{
    let data=await jsonfile.readFile(file);
    let arr=data;
    let index=arr.findIndex(x=>x.id==id);
    arr[index]={id:id,...updateData};
    await jsonfile.writeFile(file,arr);
}

// Delete user/Perm
const deleteData = async(id,file)=>{
    let data=await jsonfile.readFile(file);
    let arr=data;
    let newarr=arr.filter(x=>x.id!=id);
    await jsonfile.writeFile(file,newarr);
}

module.exports = {GetAll,GetById,Add,UpdateData,deleteData};
