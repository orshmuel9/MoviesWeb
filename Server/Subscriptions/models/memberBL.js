const Member=require('./memberSchema');

//get All Member
const getAllMembers =() =>{
    return new Promise((resolve,reject)=>{
        Member.find({},(err,membersdata)=>{
            if(err){
                reject(err);
            }
            else{
                
                resolve(membersdata);
            }
        })
    })
}

// get member by id
const getMemberById =(id)=>{
    return new Promise((resolve,reject)=>{
        Member.findById(id,(err,memberdata)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(memberdata);
            }
        })
    })
}

// add member
const addMember=(member)=>{
    return new Promise((resolve,reject)=>{
        let newmember= new Member({
            name:member.name,
            email:member.email,
            city:member.city
        })
        newmember.save((err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("member created!")
            }
        })
    })
}

//uppdate member
const updateMember=(member,id)=>{
    return new Promise((resolve,reject)=>{
        Member.findByIdAndUpdate(id,{name:member.name,email:member.email,city:member.city},(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("updated member")
            }
        })
    })
}

//delete member
const deletemember=(id)=>{
    return new Promise((resolve,reject)=>{
        Member.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("Member deleted")
            }
        })
    })
}

module.exports ={getAllMembers,getMemberById,addMember,updateMember,deletemember}