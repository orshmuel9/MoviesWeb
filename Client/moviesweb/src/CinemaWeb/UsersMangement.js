import React, {useState,useEffect} from 'react'
import Utils from './Utils'
import UserMangement from './UserMangement'
import './UsersMangement.css'
import './UserCreate'
import { useSelector } from 'react-redux'

function UsersMangemengt (props){
    const [users,setUsers] = useState([{user:{},userJson:{},perm:{}}]);
    const [showusers,setShowusers] =useState("hide");
    const [buttonsmenu,setButtonsMenu] =useState("show")
    const userperm = useSelector(state=>state.users);
    useEffect(()=>{
        const getdata=async ()=>{
            let usersdata=await Utils.GetUsers();
            setUsers(usersdata);
        }
        getdata()
    },[])
    const adduser=()=>{
        props.history.push(`/UserCreate/${props.match.params.id}`)
    }
    const cngusers = () =>{
        if(showusers=="hide"){
            setShowusers("show")
            setButtonsMenu("hide")
        }
        else{
            setShowusers("hide")
        }
    }
    const Goback =() =>{
        props.history.push(`/MainPage/${props.match.params.id}`)
    }
    const deleteuser = (id) =>{
        let arr=users;
        let newarr=arr.filter(x=>x.userJson.id!=id);
        setUsers(newarr)
    }
    let obj=users.map((user,index)=>{
        return <UserMangement key={index} user={user} id={props.match.params.id} callback2={id=>deleteuser(id)} />
    })
    return(
        <div>
            <h3>Users Mangemengt -  {userperm[1].FirstName} {userperm[1].LastName}</h3>
            <div>
                <input type="button" value="All Users" onClick={cngusers} className="button" />
                <input type="button" value="Add User" onClick={adduser} className="adduser" />
                <input type="button" value="Back To Menu" onClick={Goback} className="backmenu"/>
            </div>
            <div className={showusers}>
                {obj}
            </div>
        </div>
    )
}

export default UsersMangemengt
