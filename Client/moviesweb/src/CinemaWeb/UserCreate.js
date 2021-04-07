import React, {useState,useEffect} from 'react';
import Utils from './Utils'
import './UserCreate.css'
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
export default function UserCreate(props){

    const [firstname,setFirstname] =useState("")
    const [lastname,setLastname] =useState("")
    const [username,setUsername] =useState("")
    const [seesion,setSession] =useState("")
    const [ViewSubscriptions,setViewSubscriptions] =useState(false)
    const [CreateSubscriptions,setCreateSubscriptions] =useState(false);
    const [DeleteSubscriptions,setDeleteSubscriptions] =useState(false);
    const [UpdateSubscriptions,setUpdateSubscriptions] =useState(false);
    const [ViewMovies,setViewMovies] =useState(false);
    const [CreateMovies,setCreateMovies] =useState(false);
    const [DeleteMovies,setDeleteMovies] =useState(false);
    const [UpdateMovies,setUpdateMovies] =useState(false);
    const ViewSub = ()=> {
        setViewSubscriptions(!ViewSubscriptions)
        if(ViewSubscriptions==true){
            setCreateSubscriptions(false);
            setDeleteSubscriptions(false);
            setUpdateSubscriptions(false);
        }
    }
    const CreateSub = ()=> {
        setCreateSubscriptions(!CreateSubscriptions)
        if(CreateSubscriptions==false){
            setViewSubscriptions(true);
        }
    }
    const DeleteSub = ()=> {
        setDeleteSubscriptions(!DeleteSubscriptions)
        if(DeleteSubscriptions==false){
            setViewSubscriptions(true);
        }
    }
    const UpdateSub = ()=> {
        setUpdateSubscriptions(!UpdateSubscriptions)
        if(UpdateSubscriptions==false){
            setViewSubscriptions(true);
        }
    }
    const ViewMovi = ()=> {
        setViewMovies(!ViewMovies)
        if(ViewMovies==true){
            setCreateMovies(false);
            setDeleteMovies(false);
            setUpdateMovies(false);
        }
    }
    const CreateMovi = ()=> {
        setCreateMovies(!CreateMovies)
        if(CreateMovies==false){
            setViewMovies(true);
        }
    }
    const DeleteMovi = ()=> {
        setDeleteMovies(!DeleteMovies)
        if(DeleteMovies==false){
            setViewMovies(true);
        }
    }
    const UpdateMovi = ()=> {
        setUpdateMovies(!UpdateMovies)
        if(UpdateMovies==false){
            setViewMovies(true);
        }
    }
    const checkusername =async (username) =>{
        let bol=true;
        let users= await Utils.GetUsers();
        users.forEach(user => {
            if(user.user.username==username){
                bol=false;
            }
        });
        return bol;
    }
    const checkFullName=(fullName) =>{
        const notVlaidInputArr = ["0","1","2","3","4","5","6","7","8","9",",","<",".",">","/","?","!","@","#","$","%","^","&","*","(",")","-","_","=","+","*","`","~",];
        let flageFullName = true;
        for(let i=0;i<fullName.length;i++){
            for(let j=0;j<notVlaidInputArr.length;j++){
                if(fullName[i].includes(notVlaidInputArr[j])){
                    flageFullName=false;
                }
            }
        }
        return flageFullName;
    }
    const AddUser = async ()=> {
        let arr=[];
        let bol=await checkusername(username);
        let bolfirst=checkFullName(firstname);
        let bollast=checkFullName(lastname);
        console.log(bol);
        if(ViewSubscriptions==true){
            arr.push("View Subscriptions")
        }
        if(CreateSubscriptions==true){
            arr.push("Create Subscriptions")
        }
        if(DeleteSubscriptions==true){
            arr.push("Delete Subscriptions")
        }
        if(UpdateSubscriptions==true){
            arr.push("Update Subscriptions")
        }
        if(ViewMovies==true){
            arr.push("View Movies")
        }
        if(CreateMovies==true){
            arr.push("Create Movies")
        }
        if(DeleteMovies==true){
            arr.push("Delete Movies")
        }
        if(UpdateMovies==true){
            arr.push("Update Movies")
        }
        console.log(arr);
        if(arr == ""){
            alert("must choose perm");
        }
        else if(firstname==""){
            alert("must choose first name")
        }
        else if(bolfirst==false){
            alert("first name not valid")
        }
        else if(lastname==""){
            alert("must choose last name")
        }
        else if(bollast==false){
            alert("last name not valid")
        }
        else if(username==""){
            alert("must choose username")
        }
        else if(bol==false){
            alert("username already taken")
            console.log("hey");
        }
        else if(seesion==""){
            alert("must choose seesion")
        }
        else{
            let time=parseInt(seesion);
            const obj = {
                user:{
                    username:username,
                    password:"needtocreateuser"
                },
                perm:{
                    permissions:arr
                },
                userJson:{
                    FirstName:firstname,
                    LastName:lastname,
                    SessionTimeOut:time,
                    CreatedDate:new Date()
                }
            }
            console.log(obj);
            await Utils.AddUser(obj)
            props.history.push(`/UsersMangement/${props.match.params.id}`)
        }
    }
    const goback = () =>{
        props.history.push(`/UsersMangement/${props.match.params.id}`)
    }
    return(
        <div>
            <h3>Add User</h3>
            First Name:<input type="text" className="input" onChange={e=>setFirstname(e.target.value)}/> <br/>
            Last Name:<input type="text"  className="input"  onChange={e=>setLastname(e.target.value)}/> <br/>
            Username:<input type="text"   className="input" onChange={e=>setUsername(e.target.value)}/> <br/>
            Seesion time out:<input type="number" className="input"  onChange={e=>setSession(e.target.value)}/> <br/>
            <h4>Permmisions:</h4>
            View Subscriptions <input type ="checkbox" value="View Subscriptions" checked={ViewSubscriptions} onChange={ViewSub}   /> <br/>
            Create Subscriptions <input type ="checkbox" value="Create Subscriptions" onChange={CreateSub} checked={CreateSubscriptions} /> <br/>
            Delete Subscriptions <input type ="checkbox" value="Delete Subscriptions" onChange={DeleteSub} checked={DeleteSubscriptions} /> <br/>
            Update Subscriptions <input type ="checkbox" value="Update Subscriptions" onChange={UpdateSub} checked={UpdateSubscriptions} /> <br/>
            View Movies <input type ="checkbox" value="View Movies"  onChange={ViewMovi} checked={ViewMovies} />  <br/>
            Create Movies <input type ="checkbox" value="Create Movies"  onChange={CreateMovi} checked={CreateMovies} />  <br/>
            Delete Movies <input type ="checkbox" value="Delete Movies" onChange={DeleteMovi} checked={DeleteMovies} />  <br/>
            Update Movies <input type ="checkbox" value="Update Movies"   onChange={UpdateMovi} checked={UpdateMovies} /> <br/> <br/>
            <Button variant="contained" color="primary" startIcon={<SaveIcon />} size="small" onClick={AddUser}>Add User</Button>
            <Button onClick={goback} variant="contained" color="secondary" size="small">Go Back</Button>
        </div>
    )
}