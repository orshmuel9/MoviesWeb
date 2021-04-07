import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import Utils from './Utils'
import './UserMangement.css'
export default function UserMangement(props){
    const [showeditanddelete,setShowedit] = useState("showedit");
    const [showdelete,setShowdelete]=useState("showdelete")
    useEffect(()=>{
        if(props.user.userJson.id != undefined){
            if(props.id == props.user.userJson.id){
                setShowedit("hide")
                setShowdelete("hide")
            }
        }
    },[props.user.userJson.id])
    const goback = () =>{
        props.callback()
    }
    const deleteuser =async () =>{
        let deleteuser=await Utils.DeleteUser(props.user.userJson.id);
        props.callback2(props.user.userJson.id)
    }
    return(
        <div >
            <br/>
            Firstname: {props.user.userJson.FirstName} <br/>
            Lastname : {props.user.userJson.LastName} <br/>
            Username: {props.user.user.username} <br/>
            Seesion time out :{props.user.userJson.SessionTimeOut} <br/>
            Created data: {props.user.userJson.CreatedDate} <br/>
            permissions: {props.user.perm.permissions} <br/> <br/>
            <div className="row">
                <div>
                    <input type="button" value="delete" onClick={deleteuser} className={showdelete}/>
                </div>
                <div>
                    <Link  to={`/EditUser/${props.id}/${props.user.userJson.id}`}><input type="button" value="edit" className={showeditanddelete} /> </Link>
                </div>
            </div>
        </div>
    )
}
