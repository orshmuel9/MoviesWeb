import React, {useState,useEffect} from 'react';
import './EditUser.css'
import Utils from './Utils'
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
export default function EditUser(props){
    const [user,setUser] =useState({user:{},userJson:{},perm:{permissions:[]}});
    const [password,setPassword] = useState(user.user.password)
    const [createdate,setCreatedate] = useState("")
    const [firstname,setFirstname]= useState(user.userJson.FirstName);
    const [lastname,setLastname] = useState(user.userJson.LastName);
    const [username,setUsername] = useState(user.user.username);
    const [seesion,setSessiom] = useState(user.userJson.SessionTimeOut);
    const [ViewSubscriptions,setViewSubscriptions] =useState(false)
    const [CreateSubscriptions,setCreateSubscriptions] =useState(false);
    const [DeleteSubscriptions,setDeleteSubscriptions] =useState(false);
    const [UpdateSubscriptions,setUpdateSubscriptions] =useState(false);
    const [ViewMovies,setViewMovies] =useState(false);
    const [CreateMovies,setCreateMovies] =useState(false);
    const [DeleteMovies,setDeleteMovies] =useState(false);
    const [UpdateMovies,setUpdateMovies] =useState(false);
    //update user



    useEffect(()=>{
        const getdata=async ()=>{
            let userdata=await Utils.GetUserById(props.match.params.userid);
            setUser(userdata);
            setPassword(userdata.user.password);
            let date="";
            for(let i=0;i<10;i++){
                date=date+userdata.userJson.CreatedDate[i]
            }
            console.log(date);
            setCreatedate(date);
            setFirstname(userdata.userJson.FirstName);
            setLastname(userdata.userJson.LastName);
            setUsername(userdata.user.username);
            setSessiom(userdata.userJson.SessionTimeOut);
        }
        getdata()
    },[props.match.params.userid])

    // all the subsucriptions
    useEffect(()=>{
        if(user.perm.permissions.includes("View Subscriptions")){
            setViewSubscriptions(!ViewSubscriptions)
        }
    },[user])
    useEffect(()=>{
        if(user.perm.permissions.includes("Create Subscriptions")){
            setCreateSubscriptions(!CreateSubscriptions)
        }
    },[user])
    useEffect(()=>{
        if(user.perm.permissions.includes("Delete Subscriptions")){
            setDeleteSubscriptions(!DeleteSubscriptions)
        }
    },[user])
    useEffect(()=>{
        if(user.perm.permissions.includes("Update Subscriptions")){
            setUpdateSubscriptions(!UpdateSubscriptions)
        }
    },[user])
    useEffect(()=>{
        if(user.perm.permissions.includes("View Movies")){
            setViewMovies(!ViewMovies)
        }
    },[user])
    useEffect(()=>{
        if(user.perm.permissions.includes("Create Movies")){
            setCreateMovies(!CreateMovies)
        }
    },[user])
    useEffect(()=>{
        if(user.perm.permissions.includes("Delete Movies")){
            setDeleteMovies(!DeleteMovies)
        }
    },[user])
    useEffect(()=>{
        if(user.perm.permissions.includes("Update Movies")){
            setUpdateMovies(!UpdateMovies)
        }
    },[user])
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
    // until this
    const goback = () =>{
        props.history.push(`/UsersMangement/${props.match.params.id}`)
    }
    const checkusername =async (username) =>{
        let bol=true;
        let users= await Utils.GetUsers();
        users.forEach(user => {
            if(user.user.username==username){
                bol=false;
            }
        });
        // בדיקה במקרה שזה של אותו יוזר
        let user= await Utils.GetUserById(props.match.params.userid);
        if(user.user.username==username){
            bol=true;
        }
        return bol;
    }
    const checkFullName=(fullName) =>{
        const notVlaidInputArr = ["0","1","2","3","4","5","6","7","8","9",",","<",".",">","/","?","!","@","#","$","%","^","&","*","(",")","-","_","=","+","*","`","~",];
        let flageFullName = true;
        for(let i=0;i<fullName.length;i++){
            for(let j=0;j<notVlaidInputArr.length;j++)
            {
                if(fullName[i].includes(notVlaidInputArr[j]))
                {
                    flageFullName=false;
                }
            }
        }
        return flageFullName;
    }
    const edituser =async ()=>{
        let arr=[];
        let bol=await checkusername(username);
        let bolfirst=checkFullName(firstname);
        let bollast=checkFullName(lastname);
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
        if(arr==""){
            alert("must choose one perm")
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
            let user={
                user:{
                    username:username,
                    password:password
                },
                perm:{
                    permissions:arr
                },
                userJson:{
                    FirstName:firstname,
                    LastName:lastname,
                    SessionTimeOut:time,
                    CreatedDate:createdate
                }
            }
            console.log(user);
            console.log("hey");
            let update=await Utils.EditUser(props.match.params.userid,user);
            console.log("hey");
            props.history.push(`/UsersMangement/${props.match.params.id}`)
        }
    }

    return(
        <div>
            <h3>Edit User {user.userJson.FirstName + " " +user.userJson.LastName}</h3>
            First Name: <input type="text" className="input" defaultValue={user.userJson.FirstName} onChange={e=>setFirstname(e.target.value)} /> <br/>
            Last Name: <input type="text" className="input" defaultValue={user.userJson.LastName} onChange={e=>setLastname(e.target.value)}/> <br/>
            UserName: <input type="text" className="input" defaultValue={user.user.username} onChange={e=>setUsername(e.target.value)}/> <br/>
            Seesion time out: <input type="number" className="input" defaultValue={user.userJson.SessionTimeOut} onChange={e=>setSessiom(e.target.value)}/> <br/>
            Created Date: {createdate} <br/> <br/>
            <h4>Permmisions:</h4>
            View Subscriptions <input type ="checkbox" value="View Subscriptions" checked={ViewSubscriptions} onChange={ViewSub}   /> <br/>
            Create Subscriptions <input type ="checkbox" value="Create Subscriptions" onChange={CreateSub} checked={CreateSubscriptions} /> <br/>
            Delete Subscriptions <input type ="checkbox" value="Delete Subscriptions" onChange={DeleteSub} checked={DeleteSubscriptions} /> <br/>
            Update Subscriptions <input type ="checkbox" value="Update Subscriptions" onChange={UpdateSub} checked={UpdateSubscriptions} /> <br/>
            View Movies <input type ="checkbox" value="View Movies"  onChange={ViewMovi} checked={ViewMovies} />  <br/>
            Create Movies <input type ="checkbox" value="Create Movies"  onChange={CreateMovi} checked={CreateMovies} />  <br/>
            Delete Movies <input type ="checkbox" value="Delete Movies" onChange={DeleteMovi} checked={DeleteMovies} />  <br/>
            Update Movies <input type ="checkbox" value="Update Movies"   onChange={UpdateMovi} checked={UpdateMovies} /> <br/> <br/>
            <Button  onClick={goback} variant="contained" color="secondary" size="small"> Go Back</Button>
            <Button variant="contained" color="primary" onClick={edituser} startIcon={<SaveIcon />} size="small">Edit User</Button>
        </div>
    )
}